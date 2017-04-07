import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchKanbanUserStoriesAction implements Action {
  readonly type = "FETCH_KANBAN_USER_STORIES";
  payload: any;

  constructor(projectId: number, appliedFilters: any) {
      this.payload = {
          projectId,
          appliedFilters,
      };
  }
}

export class MoveKanbanUsAction implements Action {
  readonly type = "MOVE_KANBAN_US";
  payload: any;

  constructor(usId: number, newStatusId: number, newIndex: number) {
      this.payload = {usId, newStatusId, newIndex};
  }
}

export class SetKanbanUserStoriesAction implements Action {
  readonly type = "SET_KANBAN_USER_STORIES";

  constructor(public payload: Immutable.List<any>) { }
}

export class AppendKanbanUserStoriesAction implements Action {
  readonly type = "APPEND_KANBAN_USER_STORIES";

  constructor(public payload: Immutable.List<any>) { }
}

export class FetchKanbanFiltersDataAction implements Action {
  readonly type = "FETCH_KANBAN_FILTERS_DATA";
  payload: any;

  constructor(projectId: number, appliedFilters: any) {
      this.payload = {
          projectId,
          appliedFilters,
      };
  }
}

export class SetKanbanFiltersDataAction implements Action {
  readonly type = "SET_KANBAN_FILTERS_DATA";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class FetchKanbanAppliedFiltersAction implements Action {
  readonly type = "FETCH_KANBAN_APPLIED_FILTERS";

  constructor(public payload: number) {}
}

export class SetKanbanAppliedFiltersAction implements Action {
  readonly type = "SET_KANBAN_APPLIED_FILTERS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class ChangeKanbanZoom implements Action {
  readonly type = "CHANGE_KANBAN_ZOOM";

  constructor(public payload: number) {}
}

export class SetKanbanZoom implements Action {
  readonly type = "SET_KANBAN_ZOOM";

  constructor(public payload: number) {}
}

export class AddKanbanFilter implements Action {
  readonly type = "ADD_KANBAN_FILTER";
  payload: any;

  constructor(category: string, filter: string) {
      this.payload = {category, filter};
  }
}

export class RemoveKanbanFilter implements Action {
  readonly type = "REMOVE_KANBAN_FILTER";
  payload: any;

  constructor(category: string, filter: string) {
      this.payload = {category, filter};
  }
}

export class CleanKanbanDataAction implements Action {
  readonly type = "CLEAN_KANBAN_DATA";
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
