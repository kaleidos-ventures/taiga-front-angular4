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
import * as actions from "./backlog.actions";
import {CloseLightboxAction} from "../../app.actions";
import {wrapLoading} from "../utils/effects";
import {generateHash} from "../../libs/utils";

@Injectable()
export class BacklogEffects {
    @Effect()
    fetchBacklogUserStories$: Observable<Action> = this.actions$
        .ofType("FETCH_BACKLOG_USER_STORIES")
        .map(toPayload)
        .switchMap(wrapLoading("loading-userstories", (payload) => {
          let filters = payload.appliedFilters.filter((value) =>
              !Immutable.List.isList(value) || value.size > 0
          )
          const params = filters.toJS();
          params.milestone = null;
          return this.rs.userstories.listAll(payload.projectId, params).map((userstories) => {
              return new actions.SetBacklogUserStoriesAction(userstories.data);
          });
        }));

    @Effect()
    refreshBacklogUserStories$: Observable<Action> = this.actions$
        .ofType("REFRESH_BACKLOG_USER_STORIES")
        .withLatestFrom(this.actions$.ofType("FETCH_BACKLOG_USER_STORIES"))
        .map(([_, action]) => action)

    @Effect()
    fetchEditingUserstory$: Observable<Action> = this.actions$
        .ofType("FETCH_EDITING_USERSTORY")
        .map(toPayload)
        .switchMap(wrapLoading("loading-editing-us", ({projectId, usId}) => {
          return this.rs.userstories.get(projectId, usId, {}).map((userstory) => {
              return new actions.SetEditingUserStoryAction(userstory.data);
          });
        }));


    @Effect()
    fetchBacklogFiltersData$: Observable<Action> = this.actions$
        .ofType("FETCH_BACKLOG_FILTERS_DATA")
        .map(toPayload)
        .switchMap((payload) => {
          let filters = payload.appliedFilters.filter((value) =>
              !Immutable.List.isList(value) || value.size > 0
          )
          const data = _.extend({project: payload.projectId}, filters.toJS());
          return this.rs.userstories.filtersData(data).map((filtersData) => {
              return new actions.SetBacklogFiltersDataAction(filtersData.data);
          });
        });

    @Effect()
    fetchBacklogAppliedFilters$: Observable<Action> = this.actions$
        .ofType("FETCH_BACKLOG_APPLIED_FILTERS")
        .map(toPayload)
        .switchMap((projectId) => {
          const ns = `${projectId}:backlog`;
          const hash = generateHash([projectId, ns]);

          return this.rs.user.getUserStorage(hash).map((filtersData) => {
              return new actions.SetBacklogAppliedFiltersAction(filtersData);
          });
        });

    @Effect()
    fetchBacklogStats$: Observable<Action> = this.actions$
        .ofType("FETCH_BACKLOG_STATS")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.projects.stats(projectId).map((stats) => {
              return new actions.SetBacklogStatsAction(stats.data);
          });
        });

    @Effect()
    fetchBacklogSprints$: Observable<Action> = this.actions$
        .ofType("FETCH_BACKLOG_SPRINTS")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.sprints.list(projectId, {"closed": false}).map((sprints) => {
              return new actions.SetBacklogSprintsAction(sprints.data);
          });
        });

    @Effect()
    fetchBacklogClosedSprints$: Observable<Action> = this.actions$
        .ofType("FETCH_BACKLOG_CLOSED_SPRINTS")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.sprints.list(projectId, {"closed": true}).map((sprints) => {
              return new actions.SetBacklogClosedSprintsAction(sprints.data.get('sprints'));
          });
        });

    @Effect()
    changeBacklogZoom$: Observable<Action> = this.actions$
        .ofType("CHANGE_BACKLOG_ZOOM")
        .map(toPayload)
        .do((payload) => {
            this.storage.set("backlog_zoom", payload);
        }).map((payload) => {
            return new actions.SetBacklogZoom(payload);
        });

    @Effect()
    usBulkCreate$: Observable<Action> = this.actions$
        .ofType("US_BULK_CREATE")
        .map(toPayload)
        .switchMap((payload) => {
            return this.rs.userstories.bulkCreate(payload.projectId, payload.statusId, payload.stories);
        }).map((result) => {
            return new actions.AppendBacklogUserStoriesAction(result);
        });

    @Effect()
    createSprint$: Observable<Action> = this.actions$
        .ofType("CREATE_SPRINT_ACTION")
        .map(toPayload)
        .switchMap(wrapLoading("creating-sprint", ({projectId, sprintName, startDate, endDate}) => {
            let data = {name: sprintName, estimated_start: startDate, estimated_finish: endDate};
            return this.rs.sprints.create(projectId, data).flatMap(() =>
                Observable.from([
                    new actions.FetchBacklogSprintsAction(projectId),
                    new CloseLightboxAction(),
                ])
            )
        }));

    @Effect()
    updateSprint$: Observable<Action> = this.actions$
        .ofType("UPDATE_SPRINT_ACTION")
        .map(toPayload)
        .switchMap(wrapLoading("updating-sprint", ({sprintId, sprintName, startDate, endDate}) =>
            this.rs.sprints.update(sprintId, {name: sprintName, estimated_start: startDate, estimated_finish: endDate}).flatMap((result) =>
                Observable.from([
                    new actions.FetchBacklogSprintsAction(result.data.get('project')),
                    new CloseLightboxAction(),
                ])
            )
        ));

    @Effect()
    deleteSprint$: Observable<Action> = this.actions$
        .ofType("DELETE_SPRINT")
        .map(toPayload)
        .switchMap(wrapLoading("deleting-sprint", (sprint) =>
            this.rs.sprints.delete(sprint.get('id')).flatMap((result) =>
                Observable.from([
                    new actions.FetchBacklogSprintsAction(sprint.get('project')),
                    new CloseLightboxAction()
                ])
            )
        ));

    @Effect()
    patchUsStatus$: Observable<Action> = this.actions$
        .ofType("PATCH_US_STATUS")
        .map(toPayload)
        .switchMap((payload) => {
            return wrapLoading(`patch-us-status-${payload.usId}`, ({usId, usVersion, newStatus}) => {
              return this.rs.userstories.patch(usId, {version: usVersion, status: newStatus}).map((us) => {
                  return new actions.SetUsAction(us.data)
              });
            })(payload);
        });

    @Effect()
    patchUsPoints$: Observable<Action> = this.actions$
        .ofType("PATCH_US_POINTS")
        .map(toPayload)
        .switchMap((payload) => {
            return wrapLoading(`patch-us-points-${payload.usId}`, ({usId, usVersion, newPoints}) => {
              return this.rs.userstories.patch(usId, {version: usVersion, points: newPoints}).flatMap((us) =>
                  Observable.from([
                      new actions.SetUsAction(us.data),
                      new actions.FetchBacklogStatsAction(us.data.get('project'))
                  ])
              );
            })(payload);
        });

    @Effect()
    moveUserStoriesToSprint$: Observable<Action> = this.actions$
        .ofType("MOVE_USER_STORIES_TO_SPRINT")
        .map(toPayload)
        .switchMap(({projectId, milestoneId, bulkStories}) => {
          return this.rs.userstories.bulkUpdateMilestone(projectId, milestoneId, bulkStories).flatMap(() =>
              Observable.from([
                  new actions.FetchBacklogStatsAction(projectId),
                  new actions.FetchBacklogSprintsAction(projectId),
                  new actions.SetSelectedUserstoriesAction(Immutable.Map<string, boolean>()),
                  new actions.RemoveBacklogUserStoriesAction(bulkStories.map(({us_id}) => us_id)),
              ])
          )});

    @Effect()
    createUserStory$: Observable<Action> = this.actions$
        .ofType("CREATE_USER_STORY")
        .map(toPayload)
        .switchMap((data) => {
          return this.rs.userstories.create(data).flatMap((result) => {
              return Observable.from([
                  new actions.FetchBacklogStatsAction(result.data.get('project')),
                  new actions.RefreshBacklogUserStoriesAction(),
                  new CloseLightboxAction(),
              ])
          }
          )});

    constructor(private actions$: Actions,
                private rs: ResourcesService,
                private storage: StorageService) { }
}
