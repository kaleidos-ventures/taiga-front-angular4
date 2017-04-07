/*
 * Copyright (C) 2014-2015 Taiga Agile LLC <taiga@taiga.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: home.controller.coffee
 */

import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as Immutable from "immutable";
import "rxjs/add/operator/map";
import { IState } from "../../app.store";
import { StartLoadingAction, StopLoadingAction } from "../../app.actions";
import { CurrentUserService } from "../services/current-user.service";
import { FetchAssignedToAction, FetchWatchingAction, CleanHomeDataAction } from "./home.actions";
import { TranslateService } from "@ngx-translate/core";

import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {FetchJoyrideEnableAction, SetJoyrideAction} from "../../app.actions";

@Component({
    selector: "tg-home",
    template: require("./home.pug"),
})
export class Home implements OnInit, OnDestroy {
    user: Observable<Immutable.Map<string, any>>;
    projects: Observable<Immutable.List<any>>;
    assignedTo: Observable<Immutable.List<any>>;
    watching: Observable<Immutable.List<any>>;
    subscriptions: Subscription[];

    constructor(private translate: TranslateService,
                private router: Router,
                private store: Store<IState>) {
        this.store.dispatch(new StartLoadingAction());
        this.user = this.store.select((state) => state.getIn(["auth", "user"]));
        this.projects = this.store.select((state) => state.getIn(["projects", "user-projects"]));
        this.assignedTo = this.store
                              .select((state) => state.getIn(["home", "assigned-to"]))
                              .filter((state) => state !== null)
                              .map((state) =>
                                      state.get("epics")
                                      .concat(state.get("userstories"))
                                      .concat(state.get("tasks"))
                                      .concat(state.get("issues"))
                                      .sortBy((i: any) => i.get("modified_date"))
                                      .reverse());
        this.watching = this.store
                            .select((state) => state.getIn(["home", "watching"]))
                            .filter((state) => state !== null)
                            .map((state) =>
                                    state.get("epics")
                                    .concat(state.get("userstories"))
                                    .concat(state.get("tasks"))
                                    .concat(state.get("issues"))
                                    .sortBy((i: any) => i.get("modified_date"))
                                    .reverse());
    }

    ngOnInit() {
        this.store.dispatch(new FetchJoyrideEnableAction());

        this.subscriptions = [
            this.user.combineLatest(this.projects).subscribe(([user, projects]: any) => {
                if (!user || user.isEmpty()) {
                    this.router.navigate(["/discover"]);
                    return;
                }
                this.store.dispatch(new FetchAssignedToAction(user.get("id"), projects));
                this.store.dispatch(new FetchWatchingAction(user.get("id"), projects));
            }),
            this.assignedTo.combineLatest(this.watching).subscribe(([assignedTo, watching]) => {
                if (assignedTo && watching) {
                    this.store.dispatch(new StopLoadingAction());
                    this.store.dispatch(new SetJoyrideAction("dashboard", this.getJoyrideSteps()));
                }
            }),
        ];

    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe()
        }
        this.store.dispatch(new CleanHomeDataAction());
    }

    getJoyrideSteps() {
        return Immutable.fromJS([
            {
                element: "section.home-project-list",
                position: "left",
                joyride: {
                    title: "JOYRIDE.DASHBOARD.STEP1.TITLE",
                    text: "JOYRIDE.DASHBOARD.STEP1.TEXT",
                },
            },
            {
                element: ".working-on-container",
                position: "right",
                joyride: {
                    title: "JOYRIDE.DASHBOARD.STEP2.TITLE",
                    text: "JOYRIDE.DASHBOARD.STEP2.TEXT",
                },
            },
            {
                element: ".watching-container",
                position: "right",
                joyride: {
                    title: "JOYRIDE.DASHBOARD.STEP3.TITLE",
                    text: [
                        "JOYRIDE.DASHBOARD.STEP3.TEXT1",
                        "JOYRIDE.DASHBOARD.STEP3.TEXT2",
                    ],
                },
            },
            {
                element: ".project-list .create-project-button",
                position: "bottom",
                joyride: {
                    title: "JOYRIDE.DASHBOARD.STEP4.TITLE",
                    text: [
                        "JOYRIDE.DASHBOARD.STEP4.TEXT1",
                        "JOYRIDE.DASHBOARD.STEP4.TEXT2",
                    ],
                },
            },
        ]);
    }
}
