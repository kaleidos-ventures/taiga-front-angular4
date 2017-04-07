import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchUserProfileAction implements Action {
  readonly type = "FETCH_USER_PROFILE";

  constructor(public payload: string) {}
}

export class SetUserProfileAction implements Action {
  readonly type = "SET_USER_PROFILE";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class FetchUserStatsAction implements Action {
  readonly type = "FETCH_USER_STATS";

  constructor(public payload: number) {}
}

export class SetUserStatsAction implements Action {
  readonly type = "SET_USER_STATS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class CleanProfileDataAction implements Action {
  readonly type = "CLEAN_PROFILE_DATA";
  payload = null;
}

export class FetchProfileContactsAction implements Action {
  readonly type = "FETCH_PROFILE_CONTACTS";

  constructor(public payload: number) {}
}

export class SetProfileContactsAction implements Action {
  readonly type = "SET_PROFILE_CONTACTS";

  constructor(public payload: Immutable.List<any>) {}
}

export class FetchProfileItemsAction implements Action {
  readonly type = "FETCH_PROFILE_ITEMS";
  public payload: any;

  constructor(userId: number, type: string, q: string, filter: string, page: number) {
      this.payload = {userId, type, q, filter, page};
  }
}

export class SetProfileItemsAction implements Action {
  readonly type = "SET_PROFILE_ITEMS";

  constructor(public payload: Immutable.List<any>) {}
}

export class FetchProfileProjectsAction implements Action {
  readonly type = "FETCH_PROFILE_PROJECTS";

  constructor(public payload: number) {}
}

export class SetProfileProjectsAction implements Action {
  readonly type = "SET_PROFILE_PROJECTS";

  constructor(public payload: Immutable.List<any>) {}
}

export class FetchProfileTimelineAction implements Action {
  readonly type = "FETCH_PROFILE_TIMELINE";
  public payload: any;

  constructor(userId: number, page: number) {
      this.payload = {userId, page}
  }
}

export class SetProfileTimelineAction implements Action {
  readonly type = "SET_PROFILE_TIMELINE";

  constructor(public payload: Immutable.Map<string, any>) {}
}

export class AppendProfileTimelineAction implements Action {
  readonly type = "APPEND_PROFILE_TIMELINE";

  constructor(public payload: Immutable.Map<string, any>) {}
}
