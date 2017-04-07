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
 * File: discover-home-order-by.controller.coffee
 */

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: "tg-discover-home-order-by",
    template: require("./discover-home-order-by.pug"),
})
export class DiscoverHomeOrderBy implements OnInit{
    @Input() order: string = "week";
    @Output() orderChange: EventEmitter<any>;
    isOpen: boolean;

    constructor(private translate: TranslateService) {
        this.orderChange = new EventEmitter();
    }

    ngOnInit() {
        this.isOpen = false;
    }

    orderBy(type) {
        this.isOpen = false;
        this.orderChange.emit(type);
    }
}
