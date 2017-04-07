import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export class GoAction implements Action {
  readonly type = "ROUTER_GO";
  public payload: any;

  constructor(path: any[], query: object = {}, extra: NavigationExtras = {}) {
    this.payload = {path, query, extra}
  }
}

export class SearchAction implements Action {
  readonly type = "ROUTER_SEARCH";
  public payload: any;

  constructor(query: object, extra: NavigationExtras = {}) {
    this.payload = {query, extra}
  }
}

export class UpdateSearchAction implements Action {
  readonly type = "ROUTER_UPDATE_SEARCH";
  public payload: any;

  constructor(query: object, extra: NavigationExtras = {}) {
    this.payload = {query, extra}
  }
}

export class ApplyFiltersAction implements Action {
  readonly type = "ROUTER_APPLY_FILTERS";
  public payload: any;

  constructor(query: object, extra: NavigationExtras = {}) {
    this.payload = {query, extra}
  }
}

export class ApplySortAction implements Action {
  readonly type = "ROUTER_APPLY_SORT";
  public payload: any;

  constructor(sort: object, extra: NavigationExtras) {
    this.payload = {sort, extra}
  }
}
