import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchAdminMembershipsAction implements Action {
  readonly type = "FETCH_ADMIN_MEMBERSHIPS";

  constructor(public payload: number) { }
}

export class FetchAdminWebhooksAction implements Action {
  readonly type = "FETCH_ADMIN_WEBHOOKS";

  constructor(public payload: number) { }
}

export class SetAdminMembershipsAction implements Action {
  readonly type = "SET_ADMIN_MEMBERSHIPS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class SetAdminWebhooksAction implements Action {
  readonly type = "SET_ADMIN_WEBHOOKS";

  constructor(public payload: Immutable.List<any>) { }
}

export class FetchAdminThirdPartyAction implements Action {
  readonly type = "FETCH_ADMIN_THIRD_PARTY";
  public payload: any;

  constructor(projectId: number, type: string) {
      this.payload = {projectId, type}
  }
}

export class SetAdminThirdPartyAction implements Action {
  readonly type = "SET_ADMIN_THIRD_PARTY";

  constructor(public payload: Immutable.List<any>) { }
}

export class StoreAdminThirdPartyAction implements Action {
  readonly type = "STORE_ADMIN_THIRD_PARTY";
  public payload: any;

  constructor(projectId: number, type: string, data: any) {
      this.payload = {projectId, type, data}
  }
}

export class CreateWebhookAction implements Action {
  readonly type = "CREATE_WEBHOOK";
  public payload: any;

  constructor(projectId: number, data: any) {
      this.payload = {projectId, data}
  }
}

export class UpdateWebhookAction implements Action {
  readonly type = "UPDATE_WEBHOOK";
  public payload: any;

  constructor(projectId: number, webhookId: number, data: any) {
      this.payload = {projectId, webhookId, data}
  }
}

export class TestWebhookAction implements Action {
  readonly type = "TEST_WEBHOOK";
  public payload: any;

  constructor(projectId: number, webhookId: number) {
      this.payload = {projectId, webhookId}
  }
}

export class DeleteWebhookAction implements Action {
  readonly type = "DELETE_WEBHOOK";
  public payload: any;

  constructor(projectId: number, webhookId: number) {
      this.payload = {projectId, webhookId}
  }
}

export class SetWebhookEditAction implements Action {
  readonly type = "SET_WEBHOOK_EDIT";
  public payload: any;

  constructor(id: number, active: boolean) {
      this.payload = {id, active}
  }
}

export class SetWebhookAddingAction implements Action {
  readonly type = "SET_WEBHOOK_ADDING";

  constructor(public payload: boolean) {}
}

export class SetWebhookLogAction implements Action {
  readonly type = "SET_WEBHOOK_LOG";
  public payload: any;

  constructor(id: number, log: Immutable.List<any>) {
      this.payload = {id, log}
  }
}

export class AddWebhookLogEntryAction implements Action {
  readonly type = "ADD_WEBHOOK_LOG_ENTRY";
  public payload: any;

  constructor(id: number, log: Immutable.List<any>) {
      this.payload = {id, log}
  }
}

export class FetchWebhookLogAction implements Action {
  readonly type = "FETCH_WEBHOOK_LOG";

  constructor(public payload: number) {}
}

export class CreateRoleAction implements Action {
  readonly type = "CREATE_ROLE";
  public payload: any;

  constructor(projectSlug: string, newRole: any) {
      this.payload = {projectSlug, newRole}
  }
}

export class DeleteRoleAction implements Action {
  readonly type = "DELETE_ROLE";
  public payload: any;

  constructor(projectSlug: string, roleId: string, newRoleId) {
      this.payload = {projectSlug, roleId, newRoleId}
  }
}

export class UpdateRoleNameAction implements Action {
  readonly type = "UPDATE_ROLE_NAME";
  public payload: any;

  constructor(roleId: string, name: string) {
      this.payload = {roleId, name}
  }
}

export class ToggleRolePermissionAction implements Action {
  readonly type = "TOGGLE_ROLE_PERMISSION";
  public payload: any;

  constructor(role: Immutable.Map<string,any>, permission: string) {
      this.payload = {role, permission}
  }
}

export class UpdateRoleComputableAction implements Action {
  readonly type = "UPDATE_ROLE_COMPUTABLE";
  public payload: any;

  constructor(roleId: string, computable: boolean) {
      this.payload = {roleId, computable}
  }
}
