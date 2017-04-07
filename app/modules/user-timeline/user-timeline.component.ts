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
 * File: modules/profile/profile-timeline/profile-timeline.controller.coffee
 */

import {Component, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import * as Immutable from "immutable";
import {UserTimelineService} from "./user-timeline.service";

@Component({
    selector: "tg-user-timeline",
    template: require("./user-timeline.pug"),
})
export class UserTimeline implements OnChanges{
    @Input() timeline: Immutable.List<any>;
    @Input() scrollDisabled: any = false;
    @Output() needMore: EventEmitter<boolean>;
    timelineList: Immutable.List<any>;

    constructor(private timelineService: UserTimelineService) {
        this.needMore = new EventEmitter();
    }

    ngOnChanges(changes) {
        if (changes.timeline && this.timeline) {
            this.timelineList = this.timeline.flatMap(this.timelineService.parseTimelineItem)
                                             .filter(this.timelineService.filterInvalid.bind(this.timelineService))
                                             .map(this.timelineService.attachExtraInfoToTimelineEntry.bind(this.timelineService)).toList();
        }
    }
}
