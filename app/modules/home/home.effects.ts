import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as Immutable from "immutable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/reduce";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import * as Rx from "rxjs/Rx";
import { ResourcesService } from "../resources/resources.service";
import {StorageService} from "./../base/storage";
import { SetAssignedToAction, SetWatchingAction } from "./home.actions";

function filterAndAddInfoDuties(duties, dutyType, projects) {
    return duties.filter((duty) => projects.get(String(duty.get("project"))))
                 .map((duty) => {
                     const project = projects.get(String(duty.get("project")));
                     const url = "/project/" + project.get('slug') + "/" + dutyType + "/" + duty.get('ref');
                     return duty.set("url", url)
                                .set("project", project)
                                .set("_name", dutyType);
                 });
}

@Injectable()
export class HomeEffects {
    @Effect()
    fetchAssignedTo$: Observable<Action> = this.actions$
        .ofType("FETCH_ASSIGNED_TO")
        .map(toPayload)
        .filter((payload) => payload.userId && payload.projects)
        .switchMap(({userId, projects}) => {
            const projectsById = projects.reduce((byId, project) => {
                return byId.set(String(project.get("id")), project);
            }, Immutable.Map());

            const epics = this.rs.epics.listInAllProjects({
                status__is_closed: false,
                assigned_to: userId,
            }).map((epics) => {
                return filterAndAddInfoDuties.bind(this)(epics.data, "epic", projectsById);
            }).map((epics) => ({key: "epics", values: epics}));

            const userstories = this.rs.userstories.listInAllProjects({
                is_closed: false,
                assigned_to: userId,
            }).map((userstories) => {
                return filterAndAddInfoDuties.bind(this)(userstories.data, "us", projectsById);
            }).map((userstories) => ({key: "userstories", values: userstories}));

            const tasks = this.rs.tasks.listInAllProjects({
                status__is_closed: false,
                assigned_to: userId,
            }).map((tasks) => {
                return filterAndAddInfoDuties.bind(this)(tasks.data, "task", projectsById);
            }).map((tasks) => ({key: "tasks", values: tasks}));

            const issues = this.rs.issues.listInAllProjects({
                status__is_closed: false,
                assigned_to: userId,
            }).map((issues) => {
                return filterAndAddInfoDuties.bind(this)(issues.data, "issue", projectsById);
            }).map((issues) => ({key: "issues", values: issues}));

            return Rx.Observable.concat(epics, userstories, tasks, issues)
                                .reduce((acc, current: any) => {
                                    return acc.set(current.key, current.values);
                                }, Immutable.Map<string, any>());
        })
        .map((assigned_to) => {
            return new SetAssignedToAction(assigned_to);
        });

    @Effect()
    fetchWatching$: Observable<Action> = this.actions$
        .ofType("FETCH_WATCHING")
        .map(toPayload)
        .filter((payload) => payload.userId && payload.projects)
        .switchMap(({userId, projects}) => {
            const projectsById = projects.reduce((byId, project) => {
                return byId.set(String(project.get("id")), project);
            }, Immutable.Map());

            const epics = this.rs.epics.listInAllProjects({
                status__is_closed: false,
                watchers: userId,
            }).map((epics) => {
                return filterAndAddInfoDuties.bind(this)(epics.data, "epic", projectsById);
            }).map((epics) => ({key: "epics", values: epics}));

            const userstories = this.rs.userstories.listInAllProjects({
                is_closed: false,
                watchers: userId,
            }).map((userstories) => {
                return filterAndAddInfoDuties.bind(this)(userstories.data, "us", projectsById);
            }).map((userstories) => ({key: "userstories", values: userstories}));

            const tasks = this.rs.tasks.listInAllProjects({
                status__is_closed: false,
                watchers: userId,
            }).map((tasks) => {
                return filterAndAddInfoDuties.bind(this)(tasks.data, "task", projectsById);
            }).map((tasks) => ({key: "tasks", values: tasks}));

            const issues = this.rs.issues.listInAllProjects({
                status__is_closed: false,
                watchers: userId,
            }).map((issues) => {
                return filterAndAddInfoDuties.bind(this)(issues.data, "issue", projectsById);
            }).map((issues) => ({key: "issues", values: issues}));

            return Rx.Observable.concat(epics, userstories, tasks, issues)
                                .reduce((acc, current: any) => {
                                    return acc.set(current.key, current.values);
                                }, Immutable.Map<string, any>());
        })
        .map((watching) => {
            return new SetWatchingAction(watching);
        });

    constructor(private actions$: Actions,
                private storage: StorageService,
                private rs: ResourcesService) { }
}
