import { Action } from "@ngrx/store";
import * as Immutable from "immutable";

export class SetFiltersAction implements Action {
  readonly type = "SET_FILTERS";
  public payload: any;

  constructor(section: string, filters: any) {
    this.payload = {section, filters};
  }
}

export class SetFilterAction implements Action {
  readonly type = "SET_FILTER";
  public payload: any;

  constructor(section: string, filter: string, id: any) {
    this.payload = {section, filter, id};
  }
}

export class AddFilterAction implements Action {
  readonly type = "ADD_FILTER";
  public payload: any;

  constructor(public section: string, filter: string, id: any) {
    this.payload = {section, filter, id};
  }
}

export class RemoveFilterAction implements Action {
  readonly type = "REMOVE_FILTER";
  public payload: any;

  constructor(public section: string, filter: string, id: any) {
    this.payload = {section, filter, id};
  }
}

export class SetCustomFiltersAction implements Action {
  readonly type = "SET_CUSTOM_FILTERS";
  public payload: any;

  constructor(section: string, filter: Immutable.Map<string, any>) {
      this.payload = {section, filter}
  }
}

export class StoreCustomFiltersAction implements Action {
  readonly type = "STORE_CUSTOM_FILTERS";
  public payload: any;

  constructor(projectId: number, section: string, filters: Immutable.Map<string, any>) {
    this.payload = {projectId, section, filters};
  }
}

export class StoreFiltersAction implements Action {
  readonly type = "STORE_FILTERS";
  public payload: any;

  constructor(projectId: number, section: string, filters: any) {
    this.payload = {projectId, section, filters};
  }
}

export class FetchCustomFiltersAction implements Action {
  readonly type = "FETCH_CUSTOM_FILTERS";
  public payload: any;

  constructor(projectId: number, section: string) {
    this.payload = {projectId, section};
  }
}

export class LoadStoredFiltersAction implements Action {
  readonly type = "LOAD_STORED_FILTERS";
  public payload: any;

  constructor(projectId: number, section: string) {
    this.payload = {projectId, section};
  }
}
