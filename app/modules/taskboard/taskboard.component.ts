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
import * as actions from "./taskboard.actions";
import * as _ from "lodash";

@Component({
    template: require("./taskboard.pug"),
})
export class TaskboardPage implements OnInit, OnDestroy {
    section = "taskboard";
    project: Observable<any>;
    statuses: Observable<any[]>;
    tasks: Observable<Immutable.List<any>>;
    groups: Observable<Immutable.List<any>>;
    milestone: Observable<Immutable.Map<string, any>>;
    stats: Observable<Immutable.Map<string, any>>;
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
    showGraph: boolean = false;
    subscriptions: Subscription[];

    constructor(private store: Store<IState>,
                private route: ActivatedRoute,
                private translate: TranslateService,
                private zoomLevel: ZoomLevelService) {
        this.store.dispatch(new StartLoadingAction());
        this.project = this.store.select((state) => state.getIn(["projects", "current-project"]));
        this.members = this.store.select((state) => state.getIn(["projects", "current-project", "members"]));
        this.milestone = this.store.select((state) => state.getIn(["taskboard", "milestone"]));
        this.tasks = this.store.select((state) => state.getIn(["taskboard", "tasks"]))
                                            .filter((tasks) => tasks !== null)
                                            .do(() => this.store.dispatch(new StopLoadingAction()))
                                            .map((tasks) =>
                                                tasks.sortBy((task) => task.get('taskboard_order'))
                                            );
        this.statuses = this.store.select((state) => state.getIn(["projects", "current-project", 'task_statuses']))
                                  .filter((statuses) => statuses)
                                  .map((statuses) => statuses.sortBy((data) => data.get('order')));
        this.groups = Observable.combineLatest(this.tasks, this.milestone)
                                .filter(([tasks, milestone]) => tasks !== null && milestone !== null)
                                .map(([tasks, milestone]) => {
                                    const itemsByUs = tasks.groupBy((task) => task.get('user_story'));
                                    const userstories = milestone.get('user_stories');
                                    return userstories.map((userstory) => {
                                        return userstory.set('items', itemsByUs.get(userstory.get('id')).groupBy((task) => task.get('status').toString()))
                                    })
                                });

        this.zoom = this.store.select((state) => state.getIn(["taskboard", "zoomLevel"])).map((level) => {
            return {
                level,
                visibility: this.zoomLevel.getVisibility("taskboard", level),
            };
        });
        this.appliedFilters = this.store.select((state) => state.getIn([this.section, "appliedFilters"]));
        this.filters = this.store.select((state) => state.getIn(["taskboard", "filtersData"]));
        this.stats = this.store.select((state) => state.getIn(["taskboard", "stats"]))
                               .map((stats) => {
                                   if (stats) {
                                       let totalPointsSum = stats.get('total_points').reduce((res, n) => res + n, 0);
                                       let completedPointsSum = stats.get('completed_points').reduce((res, n) => res + n, 0);
                                       let remainingPointsSum = totalPointsSum - completedPointsSum;
                                       let remainingTasks = stats.get('total_tasks') - stats.get('completed_tasks');
                                       let completedPercentage;
                                       if (totalPointsSum) {
                                           completedPercentage = Math.round((100*completedPointsSum)/totalPointsSum);
                                       } else {
                                           completedPercentage = 0;
                                       }

                                       return stats.set('totalPointsSum', totalPointsSum)
                                                   .set('completedPointsSum', completedPointsSum)
                                                   .set('remainingPointsSum', remainingPointsSum)
                                                   .set('remainingTasks', remainingTasks)
                                                   .set('completedPercentage', completedPercentage);
                                   }
                                   return stats
                               });
        this.appliedFilters = this.store.select((state) => state.getIn(["filter", "taskboard"]));
        this.appliedFiltersList = this.appliedFilters.combineLatest(this.project, this.filters).map(this.reformatAppliedFilters);
        this.customFilters = this.store.select((state) => state.getIn(["filter", "taskboard-custom-filters"]));
        this.assignedOnAssignedTo = this.store.select((state) => state.getIn(["taskboard", "current-us", "assigned_to"]))
                                              .map((id) => Immutable.List(id));
        this.bulkCreateState = this.store.select((state) => state.getIn(["taskboard", "bulk-create-state"]));
    }

    ngOnInit() {
        this.subscriptions = [
            Observable.combineLatest(this.project, this.route.params, this.appliedFilters).subscribe(([project, params, appliedFilters]: any[]) => {
                if (project && appliedFilters && params) {
                    this.store.dispatch(new actions.FetchTaskboardFiltersDataAction(project.get("id"), appliedFilters));
                    this.store.dispatch(new actions.FetchTaskboardMilestoneAction(project.get("id"), params.sprintSlug));
                }
            }),
            Observable.combineLatest(this.milestone, this.appliedFilters).subscribe(([milestone, appliedFilters]: any[]) => {
                if (milestone && appliedFilters) {
                    this.store.dispatch(new actions.FetchTaskboardTasksAction(milestone.get('id'), appliedFilters));
                }
            }),
            Observable.combineLatest(this.project, this.milestone).subscribe(([project, milestone]) => {
                if (project && milestone) {
                    this.store.dispatch(new actions.FetchTaskboardStatsAction(project.get("id"), milestone.get('id')));
                }
            }),
            this.route.queryParams.subscribe((params) => {
                this.setFiltersFromTheUrl(Immutable.fromJS(params));
            }),
            this.project.filter((x) => x !== null).withLatestFrom(this.route.queryParams)
                        .subscribe(([project, params]: any[]) => {
                if (_.isEmpty(params) && project && !this.loadedStoredFilters) {
                    this.loadedStoredFilters = true;
                    this.store.dispatch(new filter_actions.LoadStoredFiltersAction(project.get('id'), "taskboard"));
                }
                this.store.dispatch(new actions.FetchTaskboardAppliedFiltersAction(project.get("id")));
            }),
        ];
    }

    toggleFiltersOpen() {
        this.filtersOpen = !this.filtersOpen;
    }

    addFilter({category, filter}) {
        this.store.dispatch(new actions.AddTaskboardFilter(category.get("dataType"), filter.get("id")));
    }

    removeFilter({category, filter}) {
        this.store.dispatch(new actions.RemoveTaskboardFilter(category.get("dataType"), filter.get("id")));
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
        this.store.dispatch(new actions.CleanTaskboardDataAction());
    }

    reformatAppliedFilters([appliedFilters, project, filters]) {
        let result = Immutable.List()
        if (!appliedFilters || !project) {
            return result;
        }

        let statusesFilters = appliedFilters.get('status').map((filter) => {
            let taskStatus = project.getIn(['task_statuses_by_id', parseInt(filter, 10)])
            return Immutable.fromJS({
                id: taskStatus.get('id'),
                name: taskStatus.get('name'),
                color: taskStatus.get('color'),
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

        return statusesFilters.concat(tagsFilters, assignedToFilters, ownerFilters);
    }


    getJoyrideSteps() {
        return Immutable.fromJS([
            {
                element: ".taskboard-table-inner",
                position: "bottom",
                joyride: {
                    title: "JOYRIDE.TASKBOARD.STEP1.TITLE",
                    text: "JOYRIDE.TASKBOARD.STEP1.TEXT",
                },
            },
            {
                element: ".card-placeholder",
                position: "right",
                joyride: {
                    title: "JOYRIDE.TASKBOARD.STEP2.TITLE",
                    text: "JOYRIDE.TASKBOARD.STEP2.TEXT",
                },
            },
            //if (this.checkPermissionsService.check("add_us")) {
            {
                element: ".add-action",
                position: "bottom",
                joyride: {
                    title: "JOYRIDE.TASKBOARD.STEP3.TITLE",
                    text: [
                        "JOYRIDE.TASKBOARD.STEP3.TEXT1",
                        "JOYRIDE.TASKBOARD.STEP3.TEXT2",
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
        this.store.dispatch(new filter_actions.SetFiltersAction("taskboard", filters));
    }
}
