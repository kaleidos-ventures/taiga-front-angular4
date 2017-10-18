import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchUserProjectsAction implements Action {
  readonly type = "FETCH_USER_PROJECTS";

  constructor(public payload: number) { }
}

export class SetUserProjectsAction implements Action {
  readonly type = "SET_USER_PROJECTS";

  constructor(public payload: Immutable.List<any>) { }
}

export class FetchCurrentProjectAction implements Action {
  readonly type = "FETCH_CURRENT_PROJECT";

  constructor(public payload: string) { }
}

export class FetchDuplicateBaseProjectMembershipsAction implements Action {
  readonly type = "FETCH_DUPLICATE_BASE_PROJECT_MEMBERSHIPS";

  constructor(public payload: string) { }
}

export class SetCurrentProjectAction implements Action {
  readonly type = "SET_CURRENT_PROJECT";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class SetDuplicateBaseProjectMembershipsAction implements Action {
  readonly type = "SET_DUPLICATE_BASE_PROJECT_MEMBERSHIPS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class FetchProjectTimelineAction implements Action {
  readonly type = "FETCH_PROJECT_TIMELINE";
  public payload: any;

  constructor(projectId: number, page: number) {
      this.payload = {projectId, page}
  }
}

export class SetProjectTimelineAction implements Action {
  readonly type = "SET_PROJECT_TIMELINE";
  public payload: any;

  constructor(timeline: Immutable.List<any>, currentPage: number, hasNext: boolean) {
      this.payload = {timeline, currentPage, hasNext}
  }
}

export class AppendProjectTimelineAction implements Action {
  readonly type = "APPEND_PROJECT_TIMELINE";
  public payload: any;

  constructor(timeline: Immutable.List<any>, currentPage: number, hasNext: boolean) {
      this.payload = {timeline, currentPage, hasNext}
  }
}

export class ProjectsChangeOrderAction implements Action {
  readonly type = "PROJECTS_CHANGE_ORDER";

  constructor(public payload: any[]) {};
}

export class ProjectLikeAction implements Action {
  readonly type = "PROJECT_LIKE";

  constructor(public payload: Immutable.Map<string, any>) {};
}

export class ProjectUnlikeAction implements Action {
  readonly type = "PROJECT_UNLIKE";

  constructor(public payload: Immutable.Map<string, any>) {};
}

export class ProjectWatchAction implements Action {
  readonly type = "PROJECT_WATCH";
  public payload: any;

  constructor(project: Immutable.Map<string, any>, notificationLevel: number) {
      this.payload = {project, notificationLevel};
  };
}

export class ProjectUnwatchAction implements Action {
  readonly type = "PROJECT_UNWATCH";

  constructor(public payload: Immutable.Map<string, any>) {};
}

export class ProjectContactAction implements Action {
  readonly type = "PROJECT_CONTACT";
  public payload: any;

  constructor(project: Immutable.Map<string, any>, message: string) {
      this.payload = {project, message};
  };
}

export class CreateProjectAction implements Action {
  readonly type = "PROJECT_CREATE";
  public payload: any;

  constructor(type, name, description, isPrivate) {
      this.payload = {type, name, description, isPrivate};
  };
}

export class DuplicateProjectAction implements Action {
  readonly type = "PROJECT_DUPLICATE";
  public payload: any;

  constructor(projectId, name, description, isPrivate, users) {
      this.payload = {projectId, name, description, isPrivate, users};
  };
}

export class SetRoleAction implements Action {
  readonly type = "SET_ROLE";

  constructor(public payload: Immutable.Map<string, any>) {}
}
