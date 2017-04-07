import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as Immutable from "immutable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import { ResourcesService } from "../resources/resources.service";
import * as actions from "./projects.actions";
import {StartLoadingItemAction, StopLoadingItemAction, CloseLightboxAction} from "../../app.actions";
import {wrapLoading} from "../utils/effects";
import {GoAction} from "../../router.actions";

@Injectable()
export class CurrentProjectsEffects {
    @Effect()
    fetchCurrentProject$: Observable<Action> = this.actions$
        .ofType("FETCH_CURRENT_PROJECT")
        .map(toPayload)
        .switchMap((projectSlug) => {
          return this.rs.projects.getProjectBySlug(projectSlug)
              .map((project) => new actions.SetCurrentProjectAction(Immutable.fromJS(project)));
        });

    @Effect()
    fetchBaseProjectOnDuplication$: Observable<Action> = this.actions$
        .ofType("FETCH_DUPLICATE_BASE_PROJECT_MEMBERSHIPS")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.memberships.list(projectId)
              .map((memberships) => new actions.SetDuplicateBaseProjectMembershipsAction(memberships.data));
        });

    @Effect()
    fetchUserProjects$: Observable<Action> = this.actions$
        .ofType("FETCH_USER_PROJECTS")
        .map(toPayload)
        .switchMap((userId) => this.rs.projects.getProjectsByUserId(userId))
        .map((projects) => new actions.SetUserProjectsAction(projects));

    @Effect()
    fetchProjectTimeline$: Observable<Action> = this.actions$
        .ofType("FETCH_PROJECT_TIMELINE")
        .map(toPayload)
        .switchMap(wrapLoading("timeline", (payload) => {
          return this.rs.projects.getTimeline(payload.projectId, payload.page)
              .map((response:any) => new actions.AppendProjectTimelineAction(
                  response.data,
                  parseInt(response.headers.get('x-pagination-current'), 10),
                  response.headers.get('x-pagination-next') != null
              ));
        }));

    @Effect()
    projectsChangeOrder$: Observable<Action> = this.actions$
        .ofType("PROJECTS_CHANGE_ORDER")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.projects.bulkUpdateOrder(payload);
        });

    @Effect()
    projectLike$: Observable<Action> = this.actions$
        .ofType("PROJECT_LIKE")
        .map(toPayload)
        .flatMap(wrapLoading("like", (project) => {
            return this.rs.projects.likeProject(project.get('id')).map(() => {
              return new actions.SetCurrentProjectAction(project.set('is_fan', true)
                                                                .update("total_fans", (t) => t + 1))
            })
        }));

    @Effect()
    projectUnlike$: Observable<Action> = this.actions$
        .ofType("PROJECT_UNLIKE")
        .map(toPayload)
        .flatMap(wrapLoading("like", (project) => {
            return this.rs.projects.unlikeProject(project.get('id')).map(() => {
              return new actions.SetCurrentProjectAction(project.set('is_fan', false)
                                                                .update("total_fans", (t) => t - 1))
            })
        }));

    @Effect()
    projectWatch$: Observable<Action> = this.actions$
        .ofType("PROJECT_WATCH")
        .map(toPayload)
        .flatMap(wrapLoading("watch", ({project, notificationLevel}) => {
            return this.rs.projects.watchProject(project.get('id'), notificationLevel).map(() => {
              let add = project.get('is_watcher') ? 0 : 1;
              return new actions.SetCurrentProjectAction(project.set('is_watcher', true)
                                                                .set("notify_level", notificationLevel)
                                                                .update("total_watchers", (t) => t + add))
            })
        }));

    @Effect()
    projectUnwatch$: Observable<Action> = this.actions$
        .ofType("PROJECT_UNWATCH")
        .map(toPayload)
        .flatMap(wrapLoading("watch", (project) => {
            return this.rs.projects.unwatchProject(project.get('id')).map(() => {
              return new actions.SetCurrentProjectAction(project.set('is_watcher', false)
                                                                .update("total_watchers", (t) => t - 1))
            })
        }));

    @Effect()
    contactProject$: Observable<Action> = this.actions$
        .ofType("PROJECT_CONTACT")
        .map(toPayload)
        .flatMap(wrapLoading("contact-project", ({project, message}) => {
          return this.rs.projects.contactProject(project.get('id'), message).map(() => {
              return new CloseLightboxAction();
          });
        }));

    @Effect()
    createProject$: Observable<Action> = this.actions$
        .ofType("PROJECT_CREATE")
        .map(toPayload)
        .flatMap(wrapLoading("creating-project", ({type, name, description, isPrivate}) => {
          return this.rs.projects.create({creation_template: type === "scrum" ? 1 : 2, name, description, is_private: isPrivate}).map((project) => {
              return new GoAction(['/project', project.get('slug')]);
          });
        }));

    @Effect()
    duplicateProject$: Observable<Action> = this.actions$
        .ofType("PROJECT_DUPLICATE")
        .map(toPayload)
        .flatMap(wrapLoading("creating-project", ({projectId, name, description, isPrivate, users}) => {
          return this.rs.projects.duplicate(projectId, {name, description, is_private: isPrivate, users}).map((project) => {
              return new GoAction(['/project', project.get('slug')]);
          });
        }));

    constructor(private actions$: Actions, private rs: ResourcesService) { }
}
