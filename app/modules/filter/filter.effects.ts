import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { SearchAction } from "../../router.actions";
import * as Immutable from "immutable";
import * as _ from "lodash";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import { ResourcesService } from "../resources/resources.service";
import * as actions from "./filter.actions";
import {AddNotificationMessageAction} from "../common/common.actions";
import {genericErrorManagement} from "../utils/effects";
import {generateHash} from "../../libs/utils";

@Injectable()
export class FilterEffects {

    @Effect()
    storeCustomFitlers$: Observable<Action> = this.actions$
        .ofType("STORE_CUSTOM_FILTERS")
        .map(toPayload)
        .switchMap(({projectId, filters, section}) => {
          const ns = `${projectId}:${section}-custom-filters`
          const hash = generateHash([projectId, ns])
          return this.rs.user.setUserStorage(hash, filters).flatMap((filters) =>
              Observable.from([
                  new AddNotificationMessageAction("success"),
                  new actions.SetCustomFiltersAction(section, filters.data.get('value'))
              ])
          );
        });

    @Effect()
    fetchCustomFitlers$: Observable<Action> = this.actions$
        .ofType("FETCH_CUSTOM_FILTERS")
        .map(toPayload)
        .switchMap(({projectId, filters, section}) => {
          const ns = `${projectId}:${section}-custom-filters`
          const hash = generateHash([projectId, ns])
          return this.rs.user.getUserStorage(hash).map((filters) => {
              return new actions.SetCustomFiltersAction(section, filters.get('value'))
          });
        });

    @Effect()
    loadStoredFitlers$: Observable<Action> = this.actions$
        .ofType("LOAD_STORED_FILTERS")
        .map(toPayload)
        .switchMap(({projectId, section}) => {
          const ns = `${projectId}:${section}-filters`
          const hash = generateHash([projectId, ns])
          return this.rs.user.getUserStorage(hash).map((filters) => {
              if (filters && filters.get('value')) {
                  return new SearchAction(filters.get('value').toJS());
              }
              return new SearchAction({});
          })
        });

    @Effect()
    storeFitlers$: Observable<Action> = this.actions$
        .ofType("STORE_FILTERS")
        .map(toPayload)
        .switchMap(({projectId, section, filters}) => {
          const ns = `${projectId}:${section}-filters`
          const hash = generateHash([projectId, ns])
          return this.rs.user.setUserStorage(hash, filters).flatMap(() => Observable.empty())
        });


    constructor(private actions$: Actions, private rs: ResourcesService) { }
}
