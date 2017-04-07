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
 * File: discover-search.controller.coffee
 */

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SearchAction } from "../../../router.actions";
import { Store } from "@ngrx/store";
import { IState } from "../../../app.store";
import { SetMetadataAction } from "../../../app.actions";
import * as actions from "../discover.actions";

import * as Immutable from "immutable"

@Component({
    selector: "tg-discover-search",
    template: require("./discover-search.pug"),
})
export class DiscoverSearch implements OnInit {
    q: any;
    filter: any;
    order: any;
    searchResults: any;
    projectsCount: any;

    constructor(private route: ActivatedRoute,
                private store: Store<IState>) {
        this.store.dispatch(new SetMetadataAction("DISCOVER.SEARCH.PAGE_TITLE", {}, "DISCOVER.SEARCH.PAGE_DESCRIPTION", {}));
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.q = params.text || "";
            this.filter = params.filter || "all";
            this.order = params.order_by || "";
            this.store.dispatch(new actions.SetDiscoverSearchResults(null));
            this.store.dispatch(new actions.SearchDiscoverProjects(this.q, this.filter, this.order));
        });
        this.searchResults = this.store.select((state) => state.getIn(["discover", "search-results"]));
        this.projectsCount = this.store.select((state) => state.getIn(["discover", "projects-count"]));
        this.store.dispatch(new actions.FetchProjectsStatsAction());
    }

    setFilter({filter, q}) {
        this.store.dispatch(new SearchAction({filter: filter, text: q, order_by: ""}));
    }

    setOrder(newOrder) {
        this.store.dispatch(new SearchAction({filter: this.filter, text: this.q, order_by: newOrder}));
    }
}
