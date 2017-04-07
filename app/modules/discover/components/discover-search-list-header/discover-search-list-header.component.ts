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
 * File: discover-search-list-header.controller.coffee
 */

import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({
    selector: "tg-discover-search-list-header",
    template: require("./discover-search-list-header.pug"),
})
export class DiscoverSearchListHeader implements OnChanges {
    @Input() order: string;
    @Output() orderChange: EventEmitter<string>;
    likeIsOpen: boolean;
    activityIsOpen: boolean;

    constructor() {
        this.orderChange = new EventEmitter();
    }

    ngOnChanges(changes) {
        if(changes.order) {
            this.likeIsOpen = this.order.indexOf("-total_fans") === 0;
            this.activityIsOpen = this.order.indexOf("-total_activity") === 0;
        }
    }
}
