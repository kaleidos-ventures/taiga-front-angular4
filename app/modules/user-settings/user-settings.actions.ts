import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchLanguagesAction implements Action {
  readonly type = "FETCH_USER_SETTINGS_LANGUAGES";
  public payload = null;
}

export class FetchNotifyPoliciesAction implements Action {
  readonly type = "FETCH_USER_SETTINGS_NOTIFY_POLICIES";
  public payload = null;
}

export class SetUserSettingsLanguagesAction implements Action {
  readonly type = "SET_USER_SETTINGS_LANGUAGES";

  constructor(public payload: Immutable.List<any>) { }
}

export class SetUserSettingsNotifyPoliciesAction implements Action {
  readonly type = "SET_USER_SETTINGS_NOTIFY_POLICIES";

  constructor(public payload: Immutable.List<any>) { }
}

export class UpdateUserSettingsDataAction implements Action {
  readonly type = "UPDATE_USER_SETTINGS_DATA";
  public payload: any;

  constructor(userId: number, userData: Immutable.Map<string, any>) {
      this.payload = {userId, userData};
  }
}

export class SetUserSettingsFormErrorsAction implements Action {
  readonly type = "SET_USER_SETTINGS_FORM_ERRORS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class RemoveUserAvatarAction implements Action {
  readonly type = "REMOVE_USER_AVATAR";
  public payload = null;
}

export class UploadUserAvatarAction implements Action {
  readonly type = "UPLOAD_USER_AVATAR";

  constructor(public payload: File) { }
}

export class SetLoadingAvatarAction implements Action {
  readonly type = "SET_LOADING_AVATAR";

  constructor(public payload: boolean) { }
}

export class ChangePasswordAction implements Action {
  readonly type = "CHANGE_PASSWORD";
  public payload: any;

  constructor(currentPassword: string, newPassword: string) {
      this.payload = {currentPassword, newPassword}
  }
}

export class UpdateNotifyPolicyLevelAction implements Action {
  readonly type = "UPDATE_NOTIFY_POLICY_LEVEL";
  public payload: any;

  constructor(policyId: number, level: number) {
      this.payload = {policyId, level}
  }
}

export class CancelAccountAction implements Action {
  readonly type = "CANCEL_ACCOUNT";

  constructor(public payload: number) { }
}
