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
import * as actions from "./profile.actions";

@Injectable()
export class ProfileEffects {
    @Effect()
    fetchUserProfile$: Observable<Action> = this.actions$
        .ofType("FETCH_USER_PROFILE")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.users.getUserByUsername(payload).map((users) => {
              return new actions.SetUserProfileAction(users.data);
          });
        });

    @Effect()
    fetchUserStats$: Observable<Action> = this.actions$
        .ofType("FETCH_USER_STATS")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.users.getStats(payload).map((users) => {
              return new actions.SetUserStatsAction(users.data);
          });
        });

    @Effect()
    fetchProfileContacts: Observable<Action> = this.actions$
        .ofType("FETCH_PROFILE_CONTACTS")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.users.getContacts(payload).map((contacts) => {
              return new actions.SetProfileContactsAction(contacts.data);
          });
        });

    @Effect()
    fetchProfileProjects: Observable<Action> = this.actions$
        .ofType("FETCH_PROFILE_PROJECTS")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.projects.listByMember(payload).map((projects) => {
              return new actions.SetProfileProjectsAction(projects.data);
          });
        });

    @Effect()
    fetchProfileTimeline: Observable<Action> = this.actions$
        .ofType("FETCH_PROFILE_TIMELINE")
        .map(toPayload)
        .switchMap(({userId, page}) => {
          return this.rs.users.getUserTimeline(userId, page).map((timeline) => {
              let data = Immutable.Map<string,any>().set("timeline", timeline.data)
                                                    .set("hasNext", !!timeline.headers.get('X-Pagination-Next'));
              return new actions.AppendProfileTimelineAction(data);
          });
        });

    @Effect()
    fetchProfileItems: Observable<Action> = this.actions$
        .ofType("FETCH_PROFILE_ITEMS")
        .map(toPayload)
        .switchMap(({userId, type, q, filter, page}) => {
            let request = null;
            if (type == 'likes') {
                request = this.rs.users.getLiked(userId, page, filter, q);
            } else if (type == 'votes') {
                request = this.rs.users.getVoted(userId, page, filter, q);
            } else if (type == 'watched') {
                request = this.rs.users.getWatched(userId, page, filter, q);
            } else {
                return null;
            }
            return request.map((items) => {
                return new actions.SetProfileItemsAction(items.data);
            });
        });

    constructor(private actions$: Actions,
                private rs: ResourcesService,
                private storage: StorageService) { }
}
