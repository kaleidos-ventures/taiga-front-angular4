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
import * as actions from "./epics.actions";
import {CloseLightboxAction} from "../../app.actions";
import {wrapLoading} from "../utils/effects";

@Injectable()
export class EpicsEffects {
    @Effect()
    fetchEpics$: Observable<Action> = this.actions$
        .ofType("FETCH_EPICS")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.epics.list(payload).map((epics) => {
              return new actions.SetEpicsAction(epics.data);
          });
        });

    @Effect()
    fetchEpicUserStories$: Observable<Action> = this.actions$
        .ofType("FETCH_EPIC_USER_STORIES")
        .map(toPayload)
        .switchMap((payload) => {
          let params = {
              epic: payload,
              include_tasks: true,
              order_by: 'epic_order'
          }
          return this.rs.userstories.listInAllProjects(params).map((userstories) => {
              return new actions.SetEpicUserStoriesAction(payload, userstories.data);
          });
        });

    @Effect()
    putNewEpic$: Observable<Action> = this.actions$
        .ofType("PUT_NEW_EPIC")
        .map(toPayload)
        .switchMap(wrapLoading("new-epic", ({projectId, epicData}) => {
          let data = _.extend({}, {project: projectId}, epicData)
          data.tags = data.tags.map((i) => [i.name, i.color]);
          return this.rs.epics.post(data).flatMap((epic) => {
              return Observable.from([
                  new actions.FetchEpicsAction(projectId),
                  new CloseLightboxAction()
              ])
          });
        }));


    @Effect()
    patchEpicStatus$: Observable<Action> = this.actions$
        .ofType("PATCH_EPIC_STATUS")
        .map(toPayload)
        .switchMap((payload) => {
            return wrapLoading(`patch-epic-status-${payload.epicId}`, ({epicId, epicVersion, newStatus}) => {
              return this.rs.epics.patch(epicId, {version: epicVersion, status: newStatus}).map((epic) => {
                  return new actions.SetEpicAction(epic.data)
              });
            })(payload);
        });

    @Effect()
    patchEpicAssignedTo$: Observable<Action> = this.actions$
        .ofType("PATCH_EPIC_ASSIGNED_TO")
        .map(toPayload)
        .switchMap((payload) => {
            return wrapLoading(`patch-epic-assigned-to-${payload.epicId}`, ({epicId, epicVersion, newAssignedTo}) => {
              return this.rs.epics.patch(epicId, {version: epicVersion, assigned_to: newAssignedTo}).map((epic) => {
                  return new actions.SetEpicAction(epic.data)
              });
            })(payload);
        });

    constructor(private actions$: Actions,
                private rs: ResourcesService,
                private storage: StorageService) { }
}
