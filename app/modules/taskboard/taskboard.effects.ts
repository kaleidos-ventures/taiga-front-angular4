import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as Immutable from "immutable";
import * as _ from "lodash";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import { StorageService} from "../base/storage";
import { ResourcesService } from "../resources/resources.service";
import * as actions from "./taskboard.actions";
import {generateHash} from "../../libs/utils";

@Injectable()
export class TaskboardEffects {
    @Effect()
    fetchTaskboardStats$: Observable<Action> = this.actions$
        .ofType("FETCH_TASKBOARD_STATS")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.sprints.stats(payload.projectId, payload.milestoneId).map((stats) => {
              return new actions.SetTaskboardStatsAction(stats.data);
          });
        });
    @Effect()
    fetchTaskboardMilestone$: Observable<Action> = this.actions$
        .ofType("FETCH_TASKBOARD_MILESTONE")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.sprints.getBySlug(payload.projectId, payload.milestoneSlug).map((milestone) => {
              return new actions.SetTaskboardMilestoneAction(milestone.data);
          });
        });

    @Effect()
    fetchTaskboardTasks$: Observable<Action> = this.actions$
        .ofType("FETCH_TASKBOARD_TASKS")
        .map(toPayload)
        .switchMap((payload) => {
          let filters = payload.appliedFilters.filter((value) =>
              !Immutable.List.isList(value) || value.size > 0
          )
          const params = _.extend({
              include_attachments: 1,
          }, filters.toJS());
          return this.rs.tasks.list(payload.projectId, payload.milestoneId, null, params).map((tasks) => {
              return new actions.SetTaskboardTasksAction(tasks.data);
          });
        });

    @Effect()
    fetchTaskboardFiltersData$: Observable<Action> = this.actions$
        .ofType("FETCH_TASKBOARD_FILTERS_DATA")
        .map(toPayload)
        .switchMap((payload) => {
          const data = _.extend({project: payload.projectId}, payload.appliedFilters.toJS());
          return this.rs.userstories.filtersData(data).map((filtersData) => {
              return new actions.SetTaskboardFiltersDataAction(filtersData.data);
          });
        });

    @Effect()
    fetchTaskboardAppliedFilters: Observable<Action> = this.actions$
        .ofType("FETCH_TASKBOARD_APPLIED_FILTERS")
        .map(toPayload)
        .switchMap((projectId) => {
          const ns = `${projectId}:taskboard`;
          const hash = generateHash([projectId, ns]);

          return this.rs.user.getUserStorage(hash).map((filtersData) => {
              return new actions.SetTaskboardAppliedFiltersAction(filtersData);
          });
        });

    @Effect()
    changeTaskboardZoom$: Observable<Action> = this.actions$
        .ofType("CHANGE_TASKBOARD_ZOOM")
        .map(toPayload)
        .do((payload) => {
            this.storage.set("taskboard_zoom", payload);
        }).map((payload) => {
            return new actions.SetTaskboardZoom(payload);
        });

    @Effect()
    usBulkCreate$: Observable<Action> = this.actions$
        .ofType("US_BULK_CREATE")
        .map(toPayload)
        .switchMap((payload) => {
            return this.rs.userstories.bulkCreate(payload.projectId, payload.statusId, payload.stories);
        }).map((result) => {
            return new actions.AppendTaskboardUserStoriesAction(result);
        });

    constructor(private actions$: Actions,
                private rs: ResourcesService,
                private storage: StorageService) { }
}
