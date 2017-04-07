/*
 * Copyright (C) 2014-2017 Andrey Antukh <niwi@niwi.nz>
 * Copyright (C) 2014-2017 Jesús Espino Garcia <jespinog@gmail.com>
 * Copyright (C) 2014-2017 David Barragán Merino <bameda@dbarragan.com>
 * Copyright (C) 2014-2017 Alejandro Alonso <alejandro.alonso@kaleidos.net>
 * Copyright (C) 2014-2017 Juan Francisco Alcántara <juanfran.alcantara@kaleidos.net>
 * Copyright (C) 2014-2017 Xavi Julian <xavier.julian@kaleidos.net>
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
 * File: modules/kanban/sortable.coffee
 */

import {Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output} from "@angular/core";
import * as dragula from "dragula";
import * as Immutable from "immutable";
import * as _ from "lodash";
import {autoScroll} from "../../libs/dom-autoscroller";

@Directive({
    selector: "[tg-kanban-sortable]",
})
export class KanbanSortableDirective implements OnDestroy, OnChanges {
    @Input() userstories: Immutable.List<any>;
    @Output() sorted: EventEmitter<any>;
    private el;
    private drake;

    constructor(el: ElementRef) {
        this.sorted = new EventEmitter();
        this.drake = dragula();
        this.el = $(el.nativeElement);
    }

    ngOnChanges() {
        this.drake.destroy();
        const containers = _.map(this.el.find(".task-column"), (item) => item);
        let prevIndex = null;
        let prevState = null;

        this.drake = dragula(containers as any, {
            copy: false,
            copySortSource: false,
            moves(item) {
                return $(item).is("tg-card");
            },
        } as dragula.DragulaOptions);

        this.drake.on("drag", (item) => {
            prevIndex = $(item).index();
            prevState = $(item).parent(".task-column").data("status-id");
        });

        this.drake.on("dragend", (item) => {
            this.sorted.emit({
                newIndex: $(item).index(),
                newState: $(item).parent(".task-column").data("status-id"),
                prevIndex,
                prevState,
                usId: $(item).data("us-id"),
            });
        });

        const drake = this.drake;
        const scroll = autoScroll(containers, {
            margin: 100,
            pixels: 30,
            scrollWhenOutside: true,
            autoScroll() {
                return this.down && drake.dragging;
            },
        });
    }

    ngOnDestroy() {
        this.drake.destroy();
    }
}
