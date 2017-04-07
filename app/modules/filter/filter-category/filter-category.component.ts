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
 * File: filter-category.component.coffee
 */

import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-filter-category",
    template: require("./filter-category.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterCategory {
    @Input() category: string;
    @Input() title: string;
    @Input() selectedCategory: string;
    @Input() items: Immutable.List<any>;
    @Input() total: number;
    @Input() hideEmpty: boolean;
    @Input() applied: Immutable.List<any>;
    @Output() selectCategory: EventEmitter<any>;
    @Output() selectFilter: EventEmitter<any>;
    @Output() removeCustomFilter: EventEmitter<any>;

    constructor() {
        this.selectCategory = new EventEmitter();
        this.selectFilter = new EventEmitter();
        this.removeCustomFilter = new EventEmitter();
    }

    onSelectFilter(category, item) {
        this.selectFilter.emit({"category": category, "id": item.get('id')})
    }
}
