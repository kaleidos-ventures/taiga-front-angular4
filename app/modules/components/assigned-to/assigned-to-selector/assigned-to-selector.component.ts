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
 * File: assigned-to-selector.controller.coffee
 */

import * as Immutable from "immutable";

import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({
    host: {class: "lightbox-select-user"},
    selector: "tg-assigned-to-selector",
    template: require("./assigned-to-selector.pug"),
})
export class AssignedToSelector implements OnChanges {
    @Input() members: Immutable.List<any>;
    @Input() assigned: Immutable.List<number>;
    @Output() assign: EventEmitter<number>;
    assignedMembersList: Immutable.List<any> = Immutable.List();
    nonAssignedMembersList: Immutable.List<any> = Immutable.List();
    filterText: string = "";

    constructor() {
        this.assign = new EventEmitter();
    }

    ngOnChanges() {
        if (this.members && this.assigned) {
            this.assignedMembersList = this.members.filter((member) => {
                return this.assigned.contains(member.get("id"));
            }).toList();
            this.nonAssignedMembersList = this.members.filter((member) => {
                return !this.assigned.contains(member.get("id"));
            }).filter((member) => {
                return member.get("full_name").toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1;
            }).toList();
        }
    }

    onUserFilter(text) {
        this.filterText = text;
        this.nonAssignedMembersList = this.members.filter((member) => {
            return !this.assigned.contains(member.get("id"));
        }).filter((member) => {
            return member.get("full_name").toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1;
        }).toList();
    }

    onRemoveAssigned() {
        this.assign.emit(null);
    }

    onAssignTo(memberId) {
        this.assign.emit(memberId);
    }
}
