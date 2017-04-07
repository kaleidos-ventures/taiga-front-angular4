import * as Immutable from "immutable";
import * as filter_actions from "../filter/filter.actions";

import {Component, OnDestroy, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/zip";
import { StartLoadingAction, StopLoadingAction } from "../../app.actions";
import { IState } from "../../app.store";
import { FetchCurrentProjectAction } from "../projects/projects.actions";
import { ZoomLevelService } from "../services/zoom-level.service";
import * as actions from "./kanban.actions";
import * as _ from "lodash";

@Component({
    template: require("./kanban.pug"),
})
export class KanbanPage implements OnInit, OnDestroy {
    section = "kanban";
    project: Observable<any>;
    userstoriesByState: Observable<any[]>;
    statuses: Observable<any[]>;
    zoom: Observable<any>;
    selectedFiltersCount: number = 0;
    members: Observable<any>;
    assignedOnAssignedTo: Observable<Immutable.List<number>>;
    filtersOpen: boolean = false;
    filters: Observable<any>;
    appliedFilters: Observable<Immutable.Map<string, any>>;
    appliedFiltersList: Observable<Immutable.List<any>>;
    customFilters: Observable<Immutable.Map<string, any>>;
    bulkCreateState: Observable<number>;
    loadedStoredFilters: boolean = false;
    subscriptions: Subscription[];

    constructor(private store: Store<IState>,
                private route: ActivatedRoute,
                private translate: TranslateService,
                private zoomLevel: ZoomLevelService) {
        this.store.dispatch(new StartLoadingAction());
        this.project = this.store.select((state) => state.getIn(["projects", "current-project"]));
        this.members = this.store.select((state) => state.getIn(["projects", "current-project", "members"]));
        this.userstoriesByState = this.store.select((state) => state.getIn(["kanban", "userstories"]))
                                            .filter((uss) => uss !== null)
                                            .do(() => this.store.dispatch(new StopLoadingAction()))
                                            .map((userstories) =>
                                                userstories.sortBy((userstory) => userstory.get('kanban_order'))
                                            )
                                            .map((userstories) =>
                                                userstories.groupBy((us) => us.get("status").toString())
                                            );
        this.statuses = this.store.select((state) => state.getIn(["projects", "current-project", 'us_statuses']))
                                  .filter((statuses) => statuses)
                                  .map((statuses) => statuses.sortBy((data) => data.get('order')));

        this.zoom = this.store.select((state) => state.getIn(["kanban", "zoomLevel"])).map((level) => {
            return {
                level,
                visibility: this.zoomLevel.getVisibility("kanban", level),
            };
        });
        this.appliedFilters = this.store.select((state) => state.getIn([this.section, "appliedFilters"]));
        this.filters = this.store.select((state) => state.getIn(["kanban", "filtersData"]));
        this.appliedFilters = this.store.select((state) => state.getIn(["filter", "kanban"]));
        this.appliedFiltersList = this.appliedFilters.combineLatest(this.project, this.filters).map(this.reformatAppliedFilters);
        this.customFilters = this.store.select((state) => state.getIn(["filter", "kanban-custom-filters"]));
        this.assignedOnAssignedTo = this.store.select((state) => state.getIn(["kanban", "current-us", "assigned_to"]))
                                              .map((id) => Immutable.List(id));
        this.bulkCreateState = this.store.select((state) => state.getIn(["kanban", "bulk-create-state"]));
    }

    ngOnInit() {
        this.subscriptions = [
            Observable.combineLatest(this.project, this.appliedFilters).subscribe(([project, appliedFilters]: any[]) => {
                if (project && appliedFilters) {
                    this.store.dispatch(new actions.FetchKanbanFiltersDataAction(project.get("id"), appliedFilters));
                    this.store.dispatch(new actions.FetchKanbanUserStoriesAction(project.get("id"), appliedFilters));
                }
            }),
            this.route.queryParams.subscribe((params) => {
                this.setFiltersFromTheUrl(Immutable.fromJS(params));
            }),
            this.project.filter((x) => x !== null).withLatestFrom(this.route.queryParams)
                        .subscribe(([project, params]: any[]) => {
                if (_.isEmpty(params) && project && !this.loadedStoredFilters) {
                    this.loadedStoredFilters = true;
                    this.store.dispatch(new filter_actions.LoadStoredFiltersAction(project.get('id'), "kanban"));
                }
                this.store.dispatch(new actions.FetchKanbanAppliedFiltersAction(project.get("id")));
            }),
        ];
    }

    toggleFiltersOpen() {
        this.filtersOpen = !this.filtersOpen;
    }

    addFilter({category, filter}) {
        this.store.dispatch(new actions.AddKanbanFilter(category.get("dataType"), filter.get("id")));
    }

    removeFilter({category, filter}) {
        this.store.dispatch(new actions.RemoveKanbanFilter(category.get("dataType"), filter.get("id")));
    }

    filtersDataToFilters(filtersData) {
        if (filtersData === null) {
            return null;
        }
        const statuses = filtersData.get("statuses")
                                  .map((status) => status.update("id", (id) => id.toString()));

        const tags = filtersData.get("tags")
                              .map((tag) => tag.update("id", () => tag.get("name")));
        const tagsWithAtLeastOneElement = tags.filter((tag) => tag.count > 0);

        const assignedTo = filtersData.get("assigned_to").map((user) => {
            return user.update("id", (id) => id ? id.toString() : "null")
                       .update("name", () => user.get("full_name") || "Undefined");
        });

        const owners = filtersData.get("owners").map((owner) => {
            return owner.update("id", (id) => id.toString())
                        .update("name", () => owner.get("full_name"));
        });

        const epics = filtersData.get("epics").map((epic) => {
            if (epic.get("id")) {
                return epic.update("id", (id) => id.toString())
                           .update("name", () => `#${epic.get("ref")} ${epic.get("subject")}`);
            }
            return epic.update("id", (id) => "null")
                       .update("name", () => "Not in an epic"); // TODO TRANSLATE IT?
        });

        let filters = Immutable.List();
        filters = filters.push(Immutable.Map({
            content: statuses,
            dataType: "status",
            title: this.translate.instant("COMMON.FILTERS.CATEGORIES.STATUS"),
        }));
        filters = filters.push(Immutable.Map({
            content: tags,
            dataType: "tags",
            hideEmpty: true,
            title: this.translate.instant("COMMON.FILTERS.CATEGORIES.TAGS"),
            totalTaggedElements: tagsWithAtLeastOneElement.size,
        }));
        filters = filters.push(Immutable.Map({
            content: assignedTo,
            dataType: "assigned_to",
            title: this.translate.instant("COMMON.FILTERS.CATEGORIES.ASSIGNED_TO"),
        }));
        filters = filters.push(Immutable.Map({
            content: owners,
            dataType: "owner",
            title: this.translate.instant("COMMON.FILTERS.CATEGORIES.CREATED_BY"),
        }));
        filters = filters.push(Immutable.Map({
            content: epics,
            dataType: "epic",
            title: this.translate.instant("COMMON.FILTERS.CATEGORIES.EPIC"),
        }));
        return filters;
    }

    onSorted(value) {
        console.log(value);
    }

    onBulkCreate(value) {
        this.store.dispatch(new actions.USBulkCreateAction(
            value.projectId,
            value.statusId,
            value.stories
        ));
    }

    ngOnDestroy() {
        for (const subs of this.subscriptions) {
            subs.unsubscribe();
        }
        this.store.dispatch(new actions.CleanKanbanDataAction());
    }

    reformatAppliedFilters([appliedFilters, project, filters]) {
        let result = Immutable.List()
        if (!appliedFilters || !project) {
            return result;
        }

        let statusesFilters = appliedFilters.get('status').map((filter) => {
            let usStatus = project.getIn(['us_statuses_by_id', parseInt(filter, 10)])
            return Immutable.fromJS({
                id: usStatus.get('id'),
                name: usStatus.get('name'),
                color: usStatus.get('color'),
                type: 'status',
            });
        });

        let tagsFilters = appliedFilters.get('tags').map((filter) => {
            let tagColor = project.getIn(['tags_colors', filter])
            return Immutable.fromJS({
                id: filter,
                name: filter,
                color: tagColor,
                type: 'tags',
            });
        });

        let assignedToFilters = appliedFilters.get('assigned_to').map((filter) => {
            let member = project.getIn(['members_by_id', parseInt(filter, 10)])
            return Immutable.fromJS({
                id: member.get('id'),
                name: member.get('full_name_display') || member.get('username'),
                color: null,
                type: 'assigned_to',
            });
        });

        let ownerFilters = appliedFilters.get('owner').map((filter) => {
            let member = project.getIn(['members_by_id', parseInt(filter, 10)])
            return Immutable.fromJS({
                id: member.get('id'),
                name: member.get('full_name_display') || member.get('username'),
                color: null,
                type: 'owner',
            });
        });

        let epicsFilters = appliedFilters.get('epic').map((filter) => {
            let epicsMap = filters.get('epics').reduce((acc, epic) => acc.set(epic.get('id'), epic), Immutable.Map())
            let epic = epicsMap.get(filter)
            return Immutable.fromJS({
                id: epic.get('id'),
                name: epic.get('subject'),
                color: epic.get('color'),
                type: 'epic',
            });
        });

        return statusesFilters.concat(tagsFilters, assignedToFilters, ownerFilters, epicsFilters);
    }


    getJoyrideSteps() {
        return Immutable.fromJS([
            {
                element: ".kanban-table-inner",
                position: "bottom",
                joyride: {
                    title: "JOYRIDE.KANBAN.STEP1.TITLE",
                    text: "JOYRIDE.KANBAN.STEP1.TEXT",
                },
            },
            {
                element: ".card-placeholder",
                position: "right",
                joyride: {
                    title: "JOYRIDE.KANBAN.STEP2.TITLE",
                    text: "JOYRIDE.KANBAN.STEP2.TEXT",
                },
            },
            //if (this.checkPermissionsService.check("add_us")) {
            {
                element: ".add-action",
                position: "bottom",
                joyride: {
                    title: "JOYRIDE.KANBAN.STEP3.TITLE",
                    text: [
                        "JOYRIDE.KANBAN.STEP3.TEXT1",
                        "JOYRIDE.KANBAN.STEP3.TEXT2",
                    ],
                },
            }
        ]);
    }

    setFiltersFromTheUrl(params) {
        let filters = {};
        params.forEach((ids, category) => {
            if (category === "q") {
                filters[category] = ids
            } else {
                filters[category] = []
                for (let id of ids.split(",")) {
                    filters[category].push(id)
                }
            }
        });
        this.store.dispatch(new filter_actions.SetFiltersAction("kanban", filters));
    }
}
