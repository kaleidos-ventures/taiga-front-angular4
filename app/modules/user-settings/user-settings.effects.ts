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
import * as actions from "./user-settings.actions";
import {StoreUserAction} from "../auth/auth.actions";
import {OpenLightboxAction} from "../../app.actions";
import {AddNotificationMessageAction} from "../common/common.actions";
import {genericErrorManagement, genericSuccessManagement} from "../utils/effects";
import {LogoutAction} from "../auth/auth.actions";

@Injectable()
export class UserSettingsEffects {
    @Effect()
    fetchUserSettingsLanguages$: Observable<Action> = this.actions$
        .ofType("FETCH_USER_SETTINGS_LANGUAGES")
        .switchMap(() => {
          return this.rs.locales.list().map((result) => {
              return new actions.SetUserSettingsLanguagesAction(result.data);
          });
        });

    @Effect()
    fetchUserSettingsNotifyPolicies$: Observable<Action> = this.actions$
        .ofType("FETCH_USER_SETTINGS_NOTIFY_POLICIES")
        .switchMap(() => {
          return this.rs.notifyPolicies.list().map((result) => {
              return new actions.SetUserSettingsNotifyPoliciesAction(result.data);
          });
        });

    @Effect()
    updateUserSettingsData$: Observable<Action> = this.actions$
        .ofType("UPDATE_USER_SETTINGS_DATA")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.user.update(payload.userId, payload.userData).switchMap((result): Observable<Action> => {
              if (payload.userData.email) {
                  return Observable.from([
                      new StoreUserAction(result.data),
                      new OpenLightboxAction("user-settings.email-changed")
                  ]);
              } else {
                  return Observable.from([
                      new StoreUserAction(result.data),
                      new AddNotificationMessageAction("success")
                  ]);
              }
          }).catch((err): Observable<Action> => {
              if (err.status == 400) {
                  let errData = Immutable.fromJS(err.json());
                  if (errData.get('_error_message')) {
                      return Observable.of(new AddNotificationMessageAction("error", errData.get('_error_message')));
                  } else {
                      return Observable.of(new actions.SetUserSettingsFormErrorsAction(errData));
                  }
              } else {
                  return Observable.of(new AddNotificationMessageAction("error"));
              }
          });
        });

    @Effect()
    uploadUserAvatar$: Observable<Action> = this.actions$
        .ofType("UPLOAD_USER_AVATAR")
        .map(toPayload)
        .switchMap((payload) => {
          let queryObservable = this.rs.userSettings.changeAvatar(payload).switchMap((result): Observable<Action> => {
              return Observable.from([
                  new StoreUserAction(result.data),
                  new actions.SetLoadingAvatarAction(false)
              ]);
          }).catch((err): Observable<Action> => {
              return Observable.from([
                  new actions.SetLoadingAvatarAction(false),
                  new AddNotificationMessageAction("error")
              ]);
          });
          return Observable.of(new actions.SetLoadingAvatarAction(true)).concat(queryObservable);
        });

    @Effect()
    removeUserAvatar$: Observable<Action> = this.actions$
        .ofType("REMOVE_USER_AVATAR")
        .switchMap(() => {
          let queryObservable = this.rs.userSettings.removeAvatar().switchMap((result): Observable<Action> => {
              return Observable.from([
                  new StoreUserAction(result.data),
                  new actions.SetLoadingAvatarAction(false)
              ]);
          }).catch((err): Observable<Action> => {
              return Observable.from([
                  new actions.SetLoadingAvatarAction(false),
                  new AddNotificationMessageAction("error")
              ]);
          });
          return Observable.of(new actions.SetLoadingAvatarAction(true)).concat(queryObservable);
        });

    @Effect()
    changePassword$: Observable<Action> = this.actions$
        .ofType("CHANGE_PASSWORD")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.userSettings.changePassword(payload.currentPassword, payload.newPassword)
                     .map(genericSuccessManagement)
                     .catch(genericErrorManagement);
        });

    @Effect()
    updateNotifyPolicyLevel$: Observable<Action> = this.actions$
        .ofType("UPDATE_NOTIFY_POLICY_LEVEL")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.notifyPolicies.update(payload.policyId, payload.level)
                     .map(genericSuccessManagement)
                     .catch(genericErrorManagement);
        });

    @Effect()
    cancelAccount$: Observable<Action> = this.actions$
        .ofType("CANCEL_ACCOUNT")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.userSettings.cancelAccount(payload).map((result) => {
              return new LogoutAction();
          }).catch(genericErrorManagement);
        });

    constructor(private actions$: Actions, private rs: ResourcesService) { }
}
