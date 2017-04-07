import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import * as RouterActions from './router.actions';
import * as _ from "lodash";

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  go$ = this.actions$.ofType("ROUTER_GO")
    .map((action: RouterActions.GoAction) => action.payload)
    .do(({ path, query: queryParams, extras}) =>
      this.router.navigate(path, { queryParams, ...extras }));

  @Effect({ dispatch: false })
  search$ = this.actions$.ofType("ROUTER_SEARCH")
    .map((action: RouterActions.SearchAction) => action.payload)
    .do(({ query: queryParams, extras}) =>
      this.router.navigate([], { queryParams, ...extras }));

  @Effect({ dispatch: false })
  updateSearch = this.actions$.ofType("ROUTER_UPDATE_SEARCH")
    .map((action: RouterActions.SearchAction) => action.payload)
    .do(({ query, extras}) => {
      let queryParams = _.extend({}, this.router.parseUrl(this.router.url).queryParams, query);
      queryParams = _.omitBy(queryParams, (value) => value === null);
      this.router.navigate([], { queryParams, ...extras });
    })

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
