import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class SearchDiscoverProjects implements Action {
  readonly type = "SEARCH_DISCOVER_PROJECTS";
  payload: any;

  constructor(q: string, filter: string, orderBy: string) {
    this.payload = {q, filter, orderBy};
  }
}

export class FetchMostLikedAction implements Action {
  readonly type = "FETCH_MOST_LIKED";

  constructor(public payload: string) { }
}

export class FetchMostActiveAction implements Action {
  readonly type = "FETCH_MOST_ACTIVE";

  constructor(public payload: string) { }
}

export class FetchProjectsStatsAction implements Action {
  readonly type = "FETCH_PROJECTS_STATS";
  payload = null;
}

export class FetchFeaturedProjectsAction implements Action {
  readonly type = "FETCH_FEATURED_PROJECTS";
  payload = null;
}

export class SetMostActiveAction implements Action {
  readonly type = "SET_MOST_ACTIVE";

  constructor(public payload: Immutable.List<any>) { }
}

export class SetMostLikedAction implements Action {
  readonly type = "SET_MOST_LIKED";

  constructor(public payload: Immutable.List<any>) { }
}

export class SetProjectsStatsAction implements Action {
  readonly type = "SET_PROJECTS_STATS";

  constructor(public payload: number) { }
}

export class SetFeaturedProjectsAction implements Action {
  readonly type = "SET_FEATURED_PROJECTS";

  constructor(public payload: Immutable.List<any>) { }
}

export class SetDiscoverSearchResults implements Action {
  readonly type = "SET_DISCOVER_SEARCH_RESULTS";

  constructor(public payload: Immutable.List<any>) { }
}

export class AppendDiscoverSearchResults implements Action {
  readonly type = "APPEND_DISCOVER_SEARCH_RESULTS";

  constructor(public payload: Immutable.List<any>) { }
}

export class UpdateDiscoverSearchNextPage implements Action {
  readonly type = "UPDATE_DISCOVER_SEARCH_NEXT_PAGE";

  constructor(public payload: boolean) {}
}

export class CleanDiscoverDataAction implements Action {
  readonly type = "CLEAN_DISCOVER_DATA";
  public payload = null;
}
