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
import * as actions from "./discover.actions";

@Injectable()
export class DiscoverEffects {
    @Effect()
    fetchAssignedTo$: Observable<Action> = this.actions$
        .ofType("FETCH_MOST_ACTIVE")
        .map(toPayload)
        .switchMap((period) => {
          const orderBy = `-total_activity_${period}`;
          return this.rs.projects.getProjects({discover_mode: true, order_by: orderBy}, false).map((result) => {
              const projects = Immutable.fromJS(result.data.slice(0, 5));
              return new actions.SetMostActiveAction(projects);
          });
        });

    @Effect()
    fetchWatching$: Observable<Action> = this.actions$
        .ofType("FETCH_MOST_LIKED")
        .map(toPayload)
        .switchMap((period) => {
          const orderBy = `-total_fans_${period}`;
          return this.rs.projects.getProjects({discover_mode: true, order_by: orderBy}, false).map((result) => {
              const projects = Immutable.fromJS(result.data.slice(0, 5));
              return new actions.SetMostLikedAction(projects);
          });
        });

    @Effect()
    fetchProjectsStats$: Observable<Action> = this.actions$
        .ofType("FETCH_PROJECTS_STATS")
        .map(toPayload)
        .switchMap(() => {
           return this.rs.stats.discover().map((stats) => {
               return new actions.SetProjectsStatsAction(stats.getIn(["projects", "total"]));
           });
        });

    @Effect()
    fetchFeaturedProjects$: Observable<Action> = this.actions$
        .ofType("FETCH_FEATURED_PROJECTS")
        .map(toPayload)
        .switchMap(() => {
           return this.rs.projects.getProjects({is_featured: true, discover_mode: true}, false)
               .map((result) => {
                   const data = result.data.slice(0, 4);
                   const projects = Immutable.fromJS(data);
                   return new actions.SetFeaturedProjectsAction(projects);
           });
        });

    @Effect()
    searchDiscoverProjects$: Observable<Action> = this.actions$
        .ofType("SEARCH_DISCOVER_PROJECTS")
        .map(toPayload)
        .switchMap((payload) => {
           const params: any = { discover_mode: true };

           if (payload.filter === "people") {
               params.is_looking_for_people = true;
           } else if (payload.filter === "scrum") {
               params.is_backlog_activated = true;
           } else if (payload.filter === "kanban") {
               params.is_kanban_activated = true;
           }
           params.q = payload.q;
           params.order_by = payload.orderBy;

           return this.rs.projects.getProjects(params)
              .flatMap((result) => {
                  const hasNextPage = !!result.headers["X-Pagination-Next"];
                  const projects = Immutable.fromJS(result.data);
                  return [
                      new actions.AppendDiscoverSearchResults(projects),
                      new actions.UpdateDiscoverSearchNextPage(hasNextPage),
                  ];
              });
        });

    constructor(private actions$: Actions, private rs: ResourcesService) { }
}
