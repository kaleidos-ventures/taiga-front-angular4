import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class FetchIssuesAction implements Action {
  readonly type = "FETCH_ISSUES";
  payload: any;

  constructor(projectId: number, appliedFilters: any) {
      this.payload = {
          projectId,
          appliedFilters,
      };
  }
}

export class SetIssuesAction implements Action {
  readonly type = "SET_ISSUES";

  constructor(public payload: Immutable.List<any>) { }
}

export class FetchIssuesFiltersDataAction implements Action {
  readonly type = "FETCH_ISSUES_FILTERS_DATA";
  payload: any;

  constructor(projectId: number, appliedFilters: any) {
      this.payload = {
          projectId,
          appliedFilters,
      };
  }
}

export class SetIssuesFiltersDataAction implements Action {
  readonly type = "SET_ISSUES_FILTERS_DATA";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class FetchIssuesAppliedFiltersAction implements Action {
  readonly type = "FETCH_ISSUES_APPLIED_FILTERS";

  constructor(public payload: number) {}
}

export class SetIssuesAppliedFiltersAction implements Action {
  readonly type = "SET_ISSUES_APPLIED_FILTERS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class SetIssuesOrderAction implements Action {
  readonly type = "SET_ISSUES_ORDER";

  constructor(public payload: string) {}
}

export class CleanIssuesDataAction implements Action {
  readonly type = "CLEAN_ISSUES_DATA";
  public payload = null;

  constructor() { }
}
