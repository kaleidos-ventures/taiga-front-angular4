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
import * as actions from "./admin.actions";
import {AddNotificationMessageAction} from "../common/common.actions";
import {genericErrorManagement} from "../utils/effects";

@Injectable()
export class AdminEffects {
    @Effect()
    fetchAdminMemberships$: Observable<Action> = this.actions$
        .ofType("FETCH_ADMIN_MEMBERSHIPS")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.memberships.list(projectId).map((result) => {
              return new actions.SetAdminMembershipsAction(result.data);
          });
        });

    @Effect()
    fetchAdminWebhooks$: Observable<Action> = this.actions$
        .ofType("FETCH_ADMIN_WEBHOOKS")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.webhooks.list(projectId).map((result) => {
              return new actions.SetAdminWebhooksAction(result.data);
          });
        });

    constructor(private actions$: Actions, private rs: ResourcesService) { }
}
