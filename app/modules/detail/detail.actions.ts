import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchDetailUserStoryAction implements Action {
  readonly type = "FETCH_DETAIL_USER_STORY";
  public payload: any;

  constructor(projectId: number, ref: number) {
      this.payload = {projectId, ref};
  }
}

export class FetchDetailUserStoryCustomAttributesAction implements Action {
  readonly type = "FETCH_DETAIL_USER_STORY_CUSTOM_ATTRIBUTES";

  constructor(public payload: number) {}
}

export class SetDetailUserStoryCustomAttributesAction implements Action {
  readonly type = "SET_DETAIL_USER_STORY_CUSTOM_ATTRIBUTES";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class FetchDetailUserStoryTasksAction implements Action {
  readonly type = "FETCH_DETAIL_USER_STORY_TASKS";
  public payload: any;

  constructor(projectId: number, usId: number) {
      this.payload = {projectId, usId};
  }
}

export class SetDetailUserStoryTasksAction implements Action {
  readonly type = "SET_DETAIL_USER_STORY_TASKS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class FetchDetailUserStoryAttachmentsAction implements Action {
  readonly type = "FETCH_DETAIL_USER_STORY_ATTACHMENTS";
  public payload: any;

  constructor(projectId: number, usId: number) {
      this.payload = {projectId, usId};
  }
}

export class SetDetailUserStoryAttachmentsAction implements Action {
  readonly type = "SET_DETAIL_USER_STORY_ATTACHMENTS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class SetDetailUserStoryAction implements Action {
  readonly type = "SET_DETAIL_USER_STORY";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class CleanDetailDataAction implements Action {
  readonly type = "CLEAN_DETAIL_DATA";
  payload = null;
}
