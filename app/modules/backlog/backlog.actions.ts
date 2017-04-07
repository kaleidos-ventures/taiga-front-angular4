import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchBacklogUserStoriesAction implements Action {
  readonly type = "FETCH_BACKLOG_USER_STORIES";
  payload: any;

  constructor(projectId: number, appliedFilters: any) {
      this.payload = {
          projectId,
          appliedFilters,
      };
  }
}

export class MoveBacklogUsAction implements Action {
  readonly type = "MOVE_BACKLOG_US";
  payload: any;

  constructor(usId: number, newStatusId: number, newIndex: number) {
      this.payload = {usId, newStatusId, newIndex};
  }
}

export class SetBacklogUserStoriesAction implements Action {
  readonly type = "SET_BACKLOG_USER_STORIES";

  constructor(public payload: Immutable.List<any>) { }
}

export class RemoveBacklogUserStoriesAction implements Action {
  readonly type = "REMOVE_BACKLOG_USER_STORIES";

  constructor(public payload: number[]) { }
}

export class FetchBacklogSprintsAction implements Action {
  readonly type = "FETCH_BACKLOG_SPRINTS";

  constructor(public payload: number) {}
}

export class FetchBacklogClosedSprintsAction implements Action {
  readonly type = "FETCH_BACKLOG_CLOSED_SPRINTS";

  constructor(public payload: number) {}
}

export class SetBacklogSprintsAction implements Action {
  readonly type = "SET_BACKLOG_SPRINTS";

  constructor(public payload: Immutable.List<any>) { }
}

export class SetBacklogClosedSprintsAction implements Action {
  readonly type = "SET_BACKLOG_CLOSED_SPRINTS";

  constructor(public payload: Immutable.List<any>) { }
}


export class AppendBacklogUserStoriesAction implements Action {
  readonly type = "APPEND_BACKLOG_USER_STORIES";

  constructor(public payload: Immutable.List<any>) { }
}

export class FetchBacklogFiltersDataAction implements Action {
  readonly type = "FETCH_BACKLOG_FILTERS_DATA";
  payload: any;

  constructor(projectId: number, appliedFilters: any) {
      this.payload = {
          projectId,
          appliedFilters,
      };
  }
}

export class SetBacklogFiltersDataAction implements Action {
  readonly type = "SET_BACKLOG_FILTERS_DATA";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class FetchBacklogAppliedFiltersAction implements Action {
  readonly type = "FETCH_BACKLOG_APPLIED_FILTERS";

  constructor(public payload: number) {}
}

export class SetBacklogAppliedFiltersAction implements Action {
  readonly type = "SET_BACKLOG_APPLIED_FILTERS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class FetchBacklogStatsAction implements Action {
  readonly type = "FETCH_BACKLOG_STATS";

  constructor(public payload: number) {}
}

export class SetBacklogStatsAction implements Action {
  readonly type = "SET_BACKLOG_STATS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class ChangeBacklogZoom implements Action {
  readonly type = "CHANGE_BACKLOG_ZOOM";

  constructor(public payload: number) {}
}

export class SetBacklogZoom implements Action {
  readonly type = "SET_BACKLOG_ZOOM";

  constructor(public payload: number) {}
}

export class CleanBacklogDataAction implements Action {
  readonly type = "CLEAN_BACKLOG_DATA";
  payload = null;
}

export class SetBulkCreateLightboxDataAction implements Action {
  readonly type = "SET_BULK_CREATE_LIGHTBOX_DATA";

  constructor(public payload: number) {}
}

export class SetNewUsLightboxDataAction implements Action {
  readonly type = "SET_NEW_US_LIGHTBOX_DATA";
  payload: any;

  constructor(statusId: number, us: Immutable.Map<string, any>) {
      this.payload = {statusId, us};
  }
}

export class USBulkCreateAction implements Action {
  readonly type = "US_BULK_CREATE";
  payload: any;

  constructor(projectId: number, statusId: number, stories: string) {
      this.payload = {projectId, statusId, stories};
  }
}

export class UpdateSprintAction implements Action {
  readonly type = "UPDATE_SPRINT_ACTION";
  payload: any;

  constructor(sprintId: number, sprintName: string, startDate: string, endDate: string) {
      this.payload = {sprintId, sprintName, startDate, endDate};
  }
}

export class CreateSprintAction implements Action {
  readonly type = "CREATE_SPRINT_ACTION";
  payload: any;

  constructor(projectId: number, sprintName: string, startDate: string, endDate: string) {
      this.payload = {projectId, sprintName, startDate, endDate};
  }
}

export class SetEditingSprintAction implements Action {
  readonly type = "SET_EDITING_SPRINT";

  constructor(public payload: Immutable.Map<string, any>) {}
}

export class SetEditingUserStoryAction implements Action {
  readonly type = "SET_EDITING_USERSTORY";

  constructor(public payload: Immutable.Map<string, any>) {}
}

export class FetchEditingUserStoryAction implements Action {
  readonly type = "FETCH_EDITING_USERSTORY";
  public payload: any;

  constructor(projectId: number, usId: number) {
      this.payload = {projectId, usId};
  }
}

export class DeleteSprintAction implements Action {
  readonly type = "DELETE_SPRINT";

  constructor(public payload: Immutable.Map<string, any>) {}
}

export class PatchUsStatusAction implements Action {
  readonly type = "PATCH_US_STATUS";
  public payload: any;

  constructor(usId: number, usVersion: number, newStatus: number) {
      this.payload = {usId, usVersion, newStatus};
  }
}

export class PatchUsPointsAction implements Action {
  readonly type = "PATCH_US_POINTS";
  public payload: any;

  constructor(usId: number, usVersion: number, newPoints: any) {
      this.payload = {usId, usVersion, newPoints};
  }
}

export class SetUsAction implements Action {
  readonly type = "SET_US";

  constructor(public payload: Immutable.List<any>) { }
}

export class SetSelectedUserstoriesAction implements Action {
  readonly type = "SET_SELECTED_USER_STORIES";

  constructor(public payload: Immutable.Map<string, boolean>) { }
}

export class AddSelectedUserstoriesAction implements Action {
  readonly type = "ADD_SELECTED_USER_STORIES";

  constructor(public payload: number) { }
}

export class RemoveSelectedUserstoriesAction implements Action {
  readonly type = "REMOVE_SELECTED_USER_STORIES";

  constructor(public payload: number) { }
}

export class MoveUserStoriesToSprintAction implements Action {
  readonly type = "MOVE_USER_STORIES_TO_SPRINT";
  public payload = null;

  constructor(projectId: number, milestoneId: number, bulkStories: any) {
      this.payload = {projectId, milestoneId, bulkStories};
  }
}

export class CreateUserStoryAction implements Action {
  readonly type = "CREATE_USER_STORY";

  constructor(public payload: any) {}
}

export class UpdateUserStoryAction implements Action {
  readonly type = "UPDATE_USER_STORY";

  public payload = null;

  constructor(us: Immutable.Map<string, any>, changes: any) {
      this.payload = {us, changes};
  }
}

export class RefreshBacklogUserStoriesAction implements Action {
  readonly type = "REFRESH_BACKLOG_USER_STORIES";
  public payload = null;

  constructor() {}
}
