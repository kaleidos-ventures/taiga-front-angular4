import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchEpicsAction implements Action {
  readonly type = "FETCH_EPICS";

  constructor(public payload: number) {}
}

export class FetchEpicUserStoriesAction implements Action {
  readonly type = "FETCH_EPIC_USER_STORIES";

  constructor(public payload: number) {}
}

export class SetEpicsAction implements Action {
  readonly type = "SET_EPICS";

  constructor(public payload: Immutable.List<any>) { }
}

export class SetEpicAction implements Action {
  readonly type = "SET_EPIC";

  constructor(public payload: Immutable.List<any>) { }
}

export class SetEpicUserStoriesAction implements Action {
  readonly type = "SET_EPIC_USER_STORIES";
  public payload: any;

  constructor(id:number, data: Immutable.List<any>) {
      this.payload = {id, data};
  }
}

export class AppendEpicsAction implements Action {
  readonly type = "APPEND_EPICS";

  constructor(public payload: Immutable.List<any>) { }
}

export class CleanEpicsDataAction implements Action {
  readonly type = "CLEAN_EPICS_DATA";
  payload = null;
}

export class PutNewEpicAction implements Action {
  readonly type = "PUT_NEW_EPIC";
  public payload: any;

  constructor(projectId: number, epicData: any) {
      this.payload = {projectId, epicData};
  }
}

export class PatchEpicStatusAction implements Action {
  readonly type = "PATCH_EPIC_STATUS";
  public payload: any;

  constructor(epicId: number, epicVersion: number, newStatus: number) {
      this.payload = {epicId, epicVersion, newStatus};
  }
}

export class PatchEpicAssignedToAction implements Action {
  readonly type = "PATCH_EPIC_ASSIGNED_TO";
  public payload: any;

  constructor(epicId: number, epicVersion: number, newAssignedTo: number) {
      this.payload = {epicId, epicVersion, newAssignedTo};
  }
}

export class SetCurrentEpicAction implements Action {
  readonly type = "SET_CURRENT_EPIC";

  constructor(public payload: Immutable.Map<string, any>) { }
}
