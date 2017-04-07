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
import { ResourcesService } from "../resources/resources.service";
import * as actions from "./search.actions";
import {AddNotificationMessageAction} from "../common/common.actions";
import {wrapLoading, genericErrorManagement} from "../utils/effects";

@Injectable()
export class SearchEffects {
    @Effect()
    search$: Observable<Action> = this.actions$
        .ofType("SEARCH_IN_PROJECT")
        .debounceTime(300)
        .map(toPayload)
        .switchMap(wrapLoading("search-results", ({projectId, term}) => {
          return this.rs.search.do(projectId, term).map((result) => {
              return new actions.SetSearchResultsAction(result.data);
          });
        }));

    constructor(private actions$: Actions, private rs: ResourcesService) { }
}
