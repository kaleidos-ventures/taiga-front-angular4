import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as Immutable from "immutable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import { ResourcesService } from "./modules/resources/resources.service";
import {StorageService} from "./modules/base/storage";
import {genericErrorManagement, genericSuccessManagement} from "./modules/utils/effects";
import {SetJoyrideEnableAction} from "./app.actions";

@Injectable()
export class GlobalEffects {
    @Effect()
    sendFeedback$: Observable<Action> = this.actions$
        .ofType("SEND_FEEDBACK")
        .map(toPayload)
        .switchMap((feedback) => {
          return this.rs.feedback.send(feedback)
                     .map(genericSuccessManagement)
                     .catch(genericErrorManagement);
        });

    @Effect()
    putUserStoreValue$: Observable<Action> = this.actions$
        .ofType("PUT_JOYRIDE_ENABLED")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.user.setUserStorage("joyride", payload).map(() => {
              return new SetJoyrideEnableAction(payload);
          });
        });

    @Effect()
    fetchJoyrideEnable$: Observable<Action> = this.actions$
        .ofType("FETCH_JOYRIDE_ENABLED")
        .map(toPayload)
        .switchMap(() => {
          return this.rs.user.getUserStorage("joyride").map((response) => {
              return new SetJoyrideEnableAction(response.data.get('value'));
          }).catch((err) => {
              return this.rs.user.createUserStorage("joyride", {}).map(() => {
                  return new SetJoyrideEnableAction(Immutable.fromJS({}));
              });
          })
        });

    constructor(private storage: StorageService, private rs: ResourcesService, private actions$: Actions) {}
}
