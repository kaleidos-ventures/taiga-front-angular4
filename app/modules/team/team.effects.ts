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
import { ResourcesService } from "../resources/resources.service";
import * as actions from "./team.actions";
import {AddNotificationMessageAction} from "../common/common.actions";
import {GoAction} from "../../router.actions";
import {genericErrorManagement} from "../utils/effects";

@Injectable()
export class TeamEffects {
    @Effect()
    fetchTeamStats$: Observable<Action> = this.actions$
        .ofType("FETCH_TEAM_STATS")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.projects.memberStats(projectId).map((result) => {
              return new actions.SetTeamStatsAction(result.data);
          });
        });

    @Effect()
    teamLeaveProject$: Observable<Action> = this.actions$
        .ofType("TEAM_LEAVE_PROJECT")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.projects.leave(projectId).switchMap((result) => {
              return Observable.from([
                  new GoAction(["/"]),
                  new AddNotificationMessageAction("success"),
              ])
          }).catch(genericErrorManagement);
        });

    constructor(private actions$: Actions, private rs: ResourcesService) { }
}
