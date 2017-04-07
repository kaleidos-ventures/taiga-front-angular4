import * as Immutable from "immutable";

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
import * as actions from "./issues.actions";
import * as filter_actions from "../filter/filter.actions";
import * as _ from "lodash";

@Component({
    template: require("./issues.pug"),
})
export class IssuesPage implements OnInit, OnDestroy {
    section: string = "issues";
    project: Observable<any>;
    issues: Observable<any[]>;
    order: Observable<string>;
    selectedFiltersCount: number = 0;
    members: Observable<any>;
    assignedOnAssignedTo: Observable<Immutable.List<number>>;
    filters: Observable<any>;
    appliedFilters: Observable<Immutable.Map<string, any>>;
    appliedFiltersList: Observable<Immutable.List<any>>;
    customFilters: Observable<Immutable.Map<string, any>>;
    subscriptions: Subscription[];
    loadedStoredFilters: boolean = false;
    bulkCreateState: Observable<number>;

    constructor(private store: Store<IState>,
                private route: ActivatedRoute,
                private translate: TranslateService,
                private zoomLevel: ZoomLevelService) {

        this.project = this.store.select((state) => state.getIn(["projects", "current-project"]));
        this.members = this.store.select((state) => state.getIn(["projects", "current-project", "members"]));
        this.issues = this.store.select((state) => state.getIn(["issues", "issues"]))
                                .filter((issues) => issues !== null)
                                .do(() => this.store.dispatch(new StopLoadingAction()));
        this.order = this.store.select((state) => state.getIn(["issues", "order"]));
        this.filters = this.store.select((state) => state.getIn(["issues", "filtersData"]));
        this.appliedFilters = this.store.select((state) => state.getIn(["filter", "issues"]));
        this.appliedFiltersList = this.appliedFilters.combineLatest(this.project, this.filters).map(this.reformatAppliedFilters);
        this.customFilters = this.store.select((state) => state.getIn(["filter", "issues-custom-filters"]));
    }

    ngOnInit() {
        this.store.dispatch(new StartLoadingAction());

        this.subscriptions = [
            Observable.combineLatest(this.project, this.appliedFilters).subscribe(([project, appliedFilters]: any[]) => {
                if (project && appliedFilters) {
                    this.store.dispatch(new actions.FetchIssuesFiltersDataAction(project.get("id"), appliedFilters));
                    this.store.dispatch(new actions.FetchIssuesAction(project.get("id"), appliedFilters));
                }
            }),
            this.route.queryParams.subscribe((params) => {
                this.setOrderFromTheUrl(Immutable.fromJS(params));
                this.setFiltersFromTheUrl(Immutable.fromJS(params));
            }),
            this.project.filter((x) => x !== null).withLatestFrom(this.route.queryParams)
                        .subscribe(([project, params]: any[]) => {
                if (_.isEmpty(params) && project && !this.loadedStoredFilters) {
                    this.loadedStoredFilters = true;
                    this.store.dispatch(new filter_actions.LoadStoredFiltersAction(project.get('id'), "issues"));
                }
                this.store.dispatch(new actions.FetchIssuesAppliedFiltersAction(project.get("id")));
            }),
        ];
    }

    reformatAppliedFilters([appliedFilters, project, filters]) {
        let result = Immutable.List()
        if (!appliedFilters || !project) {
            return result;
        }

        let typesFilters = appliedFilters.get('type').map((filter) => {
            let issueType = project.getIn(['issue_types_by_id', parseInt(filter, 10)])
            return Immutable.fromJS({
                id: issueType.get('id'),
                name: issueType.get('name'),
                color: issueType.get('color'),
                type: 'type',
            });
        });

        let severitiesFilters = appliedFilters.get('severity').map((filter) => {
            let severity = project.getIn(['severities_by_id', parseInt(filter, 10)])
            return Immutable.fromJS({
                id: severity.get('id'),
                name: severity.get('name'),
                color: severity.get('color'),
                type: 'severity',
            });
        });

        let prioritiesFilters = appliedFilters.get('priority').map((filter) => {
            let priority = project.getIn(['priorities_by_id', parseInt(filter, 10)])
            return Immutable.fromJS({
                id: priority.get('id'),
                name: priority.get('name'),
                color: priority.get('color'),
                type: 'priority',
            });
        });

        let statusesFilters = appliedFilters.get('status').map((filter) => {
            let issueStatus = project.getIn(['issue_statuses_by_id', parseInt(filter, 10)])
            return Immutable.fromJS({
                id: issueStatus.get('id'),
                name: issueStatus.get('name'),
                color: issueStatus.get('color'),
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

        return statusesFilters.concat(typesFilters, severitiesFilters, prioritiesFilters, tagsFilters, assignedToFilters, ownerFilters);
    }


    ngOnDestroy() {
        for (const subs of this.subscriptions) {
            subs.unsubscribe();
        }
        this.store.dispatch(new actions.CleanIssuesDataAction());
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
        this.store.dispatch(new filter_actions.SetFiltersAction("issues", filters));
    }

    setOrderFromTheUrl(params) {
        this.store.dispatch(new actions.SetIssuesOrderAction(params.get('order_by')));
    }
}
