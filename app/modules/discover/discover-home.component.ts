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
 * File: discover-home.controller.coffee
 */

import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {GoAction} from "../../router.actions";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import {StartLoadingAction, StopLoadingAction, SetMetadataAction} from "../../app.actions";
import * as actions from "./discover.actions";
import {Observable, Subscription} from "rxjs";

@Component({
    selector: "tg-discover-home",
    template: require("./discover-home.pug"),
})
export class DiscoverHome implements OnInit {
    title: string;
    description: string;
    mostLikedProjects: Observable<any>;
    mostActiveProjects: Observable<any>;
    featuredProjects: Observable<any>;
    projectsCount: any;
    subscription: Subscription;
    likedOrder: string = "week";
    activeOrder: string = "week";

    constructor(private store: Store<IState>,
                private router: Router) {
        this.store.dispatch(new StartLoadingAction());
        this.store.dispatch(new SetMetadataAction("DISCOVER.PAGE_TITLE", {}, "DISCOVER.PAGE_DESCRIPTION", {}))

        this.mostLikedProjects = this.store.select((state) => state.getIn(["discover", "most-liked"]));
        this.mostActiveProjects = this.store.select((state) => state.getIn(["discover", "most-active"]));
        this.featuredProjects = this.store.select((state) => state.getIn(["discover", "featured"]));
        this.projectsCount = this.store.select((state) => state.getIn(["discover", "projects-count"]));
    }

    ngOnInit() {
        this.subscription = Observable.combineLatest(
            this.mostLikedProjects,
            this.mostActiveProjects,
            this.featuredProjects,
            this.projectsCount,
            (liked, active, featured, count) => {
                if (liked && active && featured && count !== null) {
                    this.store.dispatch(new StopLoadingAction());
                }
            }
        ).subscribe();
        this.store.dispatch(new actions.FetchMostActiveAction("last_week"));
        this.store.dispatch(new actions.FetchMostLikedAction("last_week"));
        this.store.dispatch(new actions.FetchProjectsStatsAction());
        this.store.dispatch(new actions.FetchFeaturedProjectsAction());
    }

    onMostActiveOrder(newOrder) {
        this.activeOrder = newOrder;
        this.store.dispatch(new actions.FetchMostActiveAction(`last_${newOrder}`));
    }

    onMostLikedOrder(newOrder) {
        this.likedOrder = newOrder;
        this.store.dispatch(new actions.FetchMostLikedAction(`last_${newOrder}`));
    }

    onSearch(searchData) {
        return this.store.dispatch(new GoAction(["/discover", "search"], {text: searchData.q}));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(new actions.CleanDiscoverDataAction());
    }
}
