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
 * File: discover-search-bar.controller.coffee
 */

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import {defineImmutableProperty} from "../../../../libs/utils";

@Component({
    selector: "tg-discover-search-bar",
    template: require("./discover-search-bar.pug"),
})
export class DiscoverSearchBar {
    @Output() search: EventEmitter<any>;
    @Input() projectsCount: number = 0;
    @Input() withFilters: boolean = false;
    @Input() q: any;
    @Input() filter: any;

    constructor(private store: Store<IState>) {
        this.search = new EventEmitter();
    }

    selectFilter(filter) {
        this.search.emit({filter, q: this.q});
        return false;
    }

    submitFilter(test) {
        this.search.emit({filter: this.filter, q: this.q});
        return false;
    }
}
