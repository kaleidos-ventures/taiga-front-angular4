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
import {wrapLoading} from "../utils/effects";
import {genericErrorManagement, genericSuccessManagement} from "../utils/effects";
import {SetRoleAction, FetchCurrentProjectAction} from "../projects/projects.actions";
import {CloseLightboxAction} from "../../app.actions";

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

    @Effect()
    fetchAdminThirdParty$: Observable<Action> = this.actions$
        .ofType("FETCH_ADMIN_THIRD_PARTY")
        .map(toPayload)
        .switchMap(wrapLoading("loading-third-party", ({projectId, type}) => {
          return this.rs.modules.list(projectId, type).map((result) => {
              return new actions.SetAdminThirdPartyAction(result.data);
          });
        }));

    @Effect()
    storeAdminThirdParty$: Observable<Action> = this.actions$
        .ofType("STORE_ADMIN_THIRD_PARTY")
        .map(toPayload)
        .switchMap(wrapLoading("storing-third-party", ({projectId, type, data}) => {
          let newData = {
              secret: data['secretKey'],
              webhooks_url: data['webhooksUrl'],
          }
          if (type !== "github" && type !== "gogs") {
              newData['valid_origin_ips'] = data['validIps'];
          }
          return this.rs.modules.store(projectId, type, newData).map((result) => {
              return new actions.FetchAdminThirdPartyAction(projectId, type);
          });
        }));

    @Effect()
    createWebhook$: Observable<Action> = this.actions$
        .ofType("CREATE_WEBHOOK")
        .map(toPayload)
        .switchMap(wrapLoading("saving-webhook-new", ({projectId, data}) => {
          return this.rs.webhooks.create(projectId, data).map((result) => {
              return new actions.FetchAdminWebhooksAction(projectId);
          });
        }));

    @Effect()
    updateWebhook$: Observable<Action> = this.actions$
        .ofType("UPDATE_WEBHOOK")
        .map(toPayload)
        .switchMap((payload) => {
          return wrapLoading(`saving-webhook-${payload.data.id}`, ({projectId, webhookId, data}) => {
              return this.rs.webhooks.update(data.id, data).flatMap((result) => {
                  return Observable.from([
                      new actions.FetchAdminWebhooksAction(projectId),
                      new actions.SetWebhookEditAction(webhookId, false)
                  ]);
              });
          })(payload);
        });

    @Effect()
    testWebhook$: Observable<Action> = this.actions$
        .ofType("TEST_WEBHOOK")
        .map(toPayload)
        .switchMap((payload) => {
          return wrapLoading(`testing-webhook-${payload.webhookId}`, ({projectId, webhookId}) => {
              return this.rs.webhooks.test(webhookId).flatMap((result) => {
                  return Observable.from([
                      new actions.FetchAdminWebhooksAction(projectId),
                      new actions.AddWebhookLogEntryAction(webhookId, result.data),
                  ])
              });
          })(payload);
        });

    @Effect()
    deleteWebhook$: Observable<Action> = this.actions$
        .ofType("DELETE_WEBHOOK")
        .map(toPayload)
        .switchMap((payload) => {
          return wrapLoading(`deleting-webhook-${payload.webhookId}`, ({projectId, webhookId}) => {
              return this.rs.webhooks.delete(webhookId).map((result) => {
                  return new actions.FetchAdminWebhooksAction(projectId);
              });
          })(payload);
        });

    @Effect()
    fetchWebhookLog$: Observable<Action> = this.actions$
        .ofType("FETCH_WEBHOOK_LOG")
        .map(toPayload)
        .switchMap((webhookId) => {
          return this.rs.webhookLogs.list(webhookId).map((result) => {
              return new actions.SetWebhookLogAction(webhookId, result.data);
          });
        });

    @Effect()
    createRole$: Observable<Action> = this.actions$
        .ofType("CREATE_ROLE")
        .map(toPayload)
        .switchMap(wrapLoading(`creating-role`, ({projectSlug, newRole}) => {
          return this.rs.roles.create(newRole).map((result) => {
              return new FetchCurrentProjectAction(projectSlug);
          }).catch(genericErrorManagement);
        }));

    @Effect()
    deleteRole$: Observable<Action> = this.actions$
        .ofType("DELETE_ROLE")
        .map(toPayload)
        .switchMap(wrapLoading(`deleting-role`, ({projectSlug, roleId, newRoleId}) => {
          return this.rs.roles.delete(roleId, newRoleId).flatMap((result) => {
              return Observable.from([
                  new CloseLightboxAction(),
                  new FetchCurrentProjectAction(projectSlug),
              ])
          }).catch(genericErrorManagement);
        }));

    @Effect()
    updateRoleName$: Observable<Action> = this.actions$
        .ofType("UPDATE_ROLE_NAME")
        .map(toPayload)
        .switchMap(wrapLoading(`updating-role-name`, ({roleId, name}) => {
          return this.rs.roles.updateName(roleId, name).map((result) => {
              return new SetRoleAction(result.data)
          }).catch(genericErrorManagement);
        }));

    @Effect()
    updateRolePermissions$: Observable<Action> = this.actions$
        .ofType("TOGGLE_ROLE_PERMISSION")
        .map(toPayload)
        .switchMap((payload) => {
          return wrapLoading(`toggling-role-permission-${payload.permission}`, ({role, permission}) => {
              let permissions = role.get('permissions').toJS()
              let idx = permissions.indexOf(permission)
              if (idx === -1) {
                  permissions.push(permission)
              } else {
                  permissions.splice(idx, 1);
              }

              return this.rs.roles.updatePermissions(role.get('id'), permissions).map((result) => {
                  return new SetRoleAction(result.data)
              }).catch(genericErrorManagement);
          })(payload)
        });

    @Effect()
    updateRoleComputable$: Observable<Action> = this.actions$
        .ofType("UPDATE_ROLE_COMPUTABLE")
        .map(toPayload)
        .switchMap(wrapLoading(`updating-role-computable`, ({roleId, computable}) => {
          return this.rs.roles.updateComputable(roleId, computable).flatMap((result) => {
              return Observable.from([
                  genericSuccessManagement(),
                  new CloseLightboxAction(),
                  new SetRoleAction(result.data)
              ]);
          }).catch(genericErrorManagement);
        }));

    constructor(private actions$: Actions, private rs: ResourcesService) { }
}
