import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as Immutable from "immutable";
import * as _ from "lodash";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import { StorageService} from "../base/storage";
import { ResourcesService } from "../resources/resources.service";
import * as actions from "./issues.actions";
import {generateHash} from "../../libs/utils";
import {wrapLoading} from "../utils/effects";

@Injectable()
export class IssuesEffects {
    @Effect()
    fetchIssues$: Observable<Action> = this.actions$
        .ofType("FETCH_ISSUES")
        .map(toPayload)
        .switchMap(wrapLoading("loading-issues", (payload) => {
          const params = _.extend({
              include_attachments: 1,
              include_tasks: 1,
          }, payload.appliedFilters.toJS());
          return this.rs.issues.list(payload.projectId, params).map((issues) => {
              return new actions.SetIssuesAction(issues.data);
          });
        }));

    @Effect()
    fetchIssuesFiltersData$: Observable<Action> = this.actions$
        .ofType("FETCH_ISSUES_FILTERS_DATA")
        .map(toPayload)
        .switchMap((payload) => {
          const data = _.extend({project: payload.projectId}, payload.appliedFilters.toJS());
          return this.rs.issues.filtersData(data).map((filtersData) => {
              return new actions.SetIssuesFiltersDataAction(filtersData.data);
          });
        });

    @Effect()
    fetchIssuesAppliedFilters: Observable<Action> = this.actions$
        .ofType("FETCH_ISSUES_APPLIED_FILTERS")
        .map(toPayload)
        .switchMap((projectId) => {
          const ns = `${projectId}:issues`;
          const hash = generateHash([projectId, ns]);

          return this.rs.user.getUserStorage(hash).map((filtersData) => {
              return new actions.SetIssuesAppliedFiltersAction(filtersData);
          });
        });

    constructor(private actions$: Actions,
                private rs: ResourcesService,
                private storage: StorageService) { }
}
