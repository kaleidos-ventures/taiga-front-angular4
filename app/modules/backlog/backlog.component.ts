import * as Immutable from "immutable";

import {Component, OnDestroy, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/zip";
import { StartLoadingAction, StopLoadingAction, OpenLightboxAction } from "../../app.actions";
import { IState } from "../../app.store";
import { FetchCurrentProjectAction } from "../projects/projects.actions";
import * as actions from "./backlog.actions";
import * as moment from "moment";
import * as _ from "lodash";
import * as filter_actions from "../filter/filter.actions";

@Component({
    template: require("./backlog.pug"),
})
export class BacklogPage implements OnInit, OnDestroy {
    showFilters: boolean = false;
    showTags: boolean = false;
    project: Observable<Immutable.Map<string, any>>;
    editingSprint: Observable<Immutable.Map<string, any>>;
    userstories: Observable<Immutable.List<any>>;
    selectedUserstories: Observable<Immutable.List<number>>;
    filters: Observable<any>;
    appliedFilters: Observable<Immutable.Map<string, any>>;
    appliedFiltersList: Observable<Immutable.List<any>>;
    customFilters: Observable<Immutable.Map<string, any>>;
    stats: Observable<Immutable.Map<string, any>>;
    sprints: Observable<Immutable.Map<string, any>>;
    editingUs: Observable<Immutable.Map<string, any>>;
    currentSprint: Observable<Immutable.Map<string, any>>;
    latestSprint: Observable<Immutable.Map<string, any>>;
    doomlinePosition: Observable<number>;
    loadedStoredFilters: boolean = false;
    subscriptions: Subscription[];

    constructor(private store: Store<IState>,
                private route: ActivatedRoute,
                private translate: TranslateService) {
        this.store.dispatch(new StartLoadingAction());
        this.project = this.store.select((state) => state.getIn(["projects", "current-project"]));
        this.editingSprint = this.store.select((state) => state.getIn(["backlog", "editing-sprint"]));
        this.sprints = this.store.select((state) => state.getIn(["backlog", "sprints"]));
        this.editingUs = this.store.select((state) => state.getIn(["backlog", "editing-us"]));
        this.latestSprint = this.sprints.map((sprints) => sprints.getIn(["sprints", 0]))
        this.currentSprint = this.sprints.map((sprints) =>
            sprints.get("sprints").filter((sprint) => {
              let currentDate = moment();
              let start = moment(sprint.estimated_start, 'YYYY-MM-DD');
              let end = moment(sprint.estimated_finish, 'YYYY-MM-DD');

              return currentDate >= start && currentDate <= end
            }).first()
        );
        this.userstories = this.store.select((state) => state.getIn(["backlog", "userstories"]))
                                     .filter((uss) => uss !== null)
                                     .do(() => this.store.dispatch(new StopLoadingAction()));
        this.selectedUserstories = this.store.select((state) => state.getIn(["backlog", "selected-userstories"]));
        this.filters = this.store.select((state) => state.getIn(["backlog", "filtersData"]));
        this.appliedFilters = this.store.select((state) => state.getIn(["filter", "backlog"]));
        this.appliedFiltersList = this.appliedFilters.combineLatest(this.project, this.filters).map(this.reformatAppliedFilters);
        this.customFilters = this.store.select((state) => state.getIn(["filter", "backlog-custom-filters"]));
        this.stats = this.store.select((state) => state.getIn(["backlog", "stats"]));
        this.doomlinePosition = this.stats.combineLatest(this.userstories).map(([stats, userstories]) => {
            if (!stats || !userstories) {
                return null
            }

            let total_points = stats.get('total_points')
            let current_sum = stats.get('assigned_points')

            let idx = 0
            for (let us of userstories.toJS()) {
                current_sum += us.total_points
                if (current_sum > total_points) {
                    return idx
                }
                idx += 1
            }
            return null
        })
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

    ngOnInit() {
        this.subscriptions = [
            Observable.combineLatest(this.project, this.appliedFilters).subscribe(([project, appliedFilters]: any[]) => {
                if (project && appliedFilters) {
                    this.store.dispatch(new actions.FetchBacklogFiltersDataAction(project.get("id"), appliedFilters));
                    this.store.dispatch(new actions.FetchBacklogUserStoriesAction(project.get("id"), appliedFilters));
                }
            }),
            this.route.queryParams.subscribe((params) => {
                this.setFiltersFromTheUrl(Immutable.fromJS(params));
            }),
            this.project.filter((x) => x !== null).withLatestFrom(this.route.queryParams)
                        .subscribe(([project, params]: any[]) => {
                if (_.isEmpty(params) && !this.loadedStoredFilters) {
                    this.loadedStoredFilters = true;
                    this.store.dispatch(new filter_actions.LoadStoredFiltersAction(project.get('id'), "backlog"));
                }
                this.store.dispatch(new filter_actions.FetchCustomFiltersAction(project.get("id"), "backlog"));
                this.store.dispatch(new actions.FetchBacklogAppliedFiltersAction(project.get("id")));
                this.store.dispatch(new actions.FetchBacklogStatsAction(project.get("id")));
                this.store.dispatch(new actions.FetchBacklogSprintsAction(project.get("id")));
            }),
        ];
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
        this.store.dispatch(new actions.CleanBacklogDataAction());
    }

    getJoyrideSteps() {
        return Immutable.fromJS([
            {
                element: ".summary",
                position: "bottom",
                joyride: {
                    title: "JOYRIDE.BACKLOG.STEP1.TITLE",
                    text: [
                        "JOYRIDE.BACKLOG.STEP1.TEXT1",
                        "JOYRIDE.BACKLOG.STEP1.TEXT2",
                    ],
                },
            },
            {
                element: ".backlog-table-empty",
                position: "bottom",
                joyride: {
                    title: "JOYRIDE.BACKLOG.STEP2.TITLE",
                    text: "JOYRIDE.BACKLOG.STEP2.TEXT",
                },
            },
            {
                element: ".sprints",
                position: "left",
                joyride: {
                    title: "JOYRIDE.BACKLOG.STEP3.TITLE",
                    text: "JOYRIDE.BACKLOG.STEP3.TEXT",
                },
            },
            // if (this.checkPermissionsService.check("add_us")) {
            {
                element: ".new-us",
                position: "rigth",
                joyride: {
                    title: "JOYRIDE.BACKLOG.STEP4.TITLE",
                    text: "JOYRIDE.BACKLOG.STEP4.TEXT",
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
        this.store.dispatch(new filter_actions.SetFiltersAction("backlog", filters));
    }
}
