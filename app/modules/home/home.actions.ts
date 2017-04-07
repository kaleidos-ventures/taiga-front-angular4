import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchAssignedToAction implements Action {
  readonly type = "FETCH_ASSIGNED_TO";
  payload: any;

  constructor(userId, projects) {
      this.payload = {userId, projects};
  }
}

export class FetchWatchingAction implements Action {
  readonly type = "FETCH_WATCHING";
  payload: any;

  constructor(userId, projects) {
      this.payload = {userId, projects};
  }
}

export class SetAssignedToAction implements Action {
  readonly type = "SET_ASSIGNED_TO";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class SetWatchingAction implements Action {
  readonly type = "SET_WATCHING";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class CleanHomeDataAction implements Action {
  readonly type = "CLEAN_HOME_DATA";
  public payload: any = null;
}
