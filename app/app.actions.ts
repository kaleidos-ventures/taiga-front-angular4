import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class OpenLightboxAction implements Action {
  readonly type = "OPEN_LIGHTBOX";

  constructor(public payload: string) {}
}

export class CloseLightboxAction implements Action {
  readonly type = "CLOSE_LIGHTBOX";
  payload = null;
}

export class StartLoadingAction implements Action {
  readonly type = "START_LOADING";
  payload = null;
}

export class StopLoadingAction implements Action {
  readonly type = "STOP_LOADING";
  payload = null;
}

export class StartLoadingItemAction implements Action {
  readonly type = "START_LOADING_ITEM";

  constructor(public payload: string) {}
}

export class StopLoadingItemAction implements Action {
  readonly type = "STOP_LOADING_ITEM";

  constructor(public payload: string) {}
}

export class SendFeedbackAction implements Action {
  readonly type = "SEND_FEEDBACK";

  constructor(public payload: string) {}
}

export class SetMetadataAction implements Action {
  readonly type = "SET_METADATA";
  public payload: any;

  constructor(title: string, title_args: any, description: string, description_args: any) {
      this.payload = {title, title_args, description, description_args};
  }
}

export class PutJoyrideEnableAction implements Action {
  readonly type = "PUT_JOYRIDE_ENABLED";

  constructor(public payload: Immutable.Map<string, boolean>) { }
}

export class FetchJoyrideEnableAction implements Action {
  readonly type = "FETCH_JOYRIDE_ENABLED";
  public payload = null;
}

export class SetJoyrideAction implements Action {
  readonly type = "SET_JOYRIDE";
  public payload: any;

  constructor(key: string, steps: Immutable.List<any>) {
      this.payload = {key, steps};
  }
}

export class SetJoyrideEnableAction implements Action {
  readonly type = "SET_JOYRIDE_ENABLED";

  constructor(public payload: Immutable.Map<string, boolean>) {}
}
