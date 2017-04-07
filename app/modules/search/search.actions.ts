import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class SearchInProjectAction implements Action {
  readonly type = "SEARCH_IN_PROJECT";
  public payload: any;

  constructor(projectId: number, term: string) {
    this.payload = {projectId, term};
  }
}

export class SetSearchResultsAction implements Action {
  readonly type = "SET_SEARCH_RESULTS";

  constructor(public payload: Immutable.Map<string, any>) { }
}

export class CleanSearchDataAction implements Action {
  readonly type = "CLEAN_SEARCH_DATA";
  public payload = null
}
