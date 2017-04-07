/*
 * Copyright (C) 2014-2017 Taiga Agile LLC <taiga@taiga.io>
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
 * File: user-timeline-attachment.directive.coffee
 */

import {Component, Input, OnChanges} from "@angular/core";
import * as Immutable from "immutable";
import {isImage} from "../../../libs/utils";

@Component({
    selector: "tg-user-timeline-attachment",
    template: require("./user-timeline-attachment.pug"),
})
export class UserTimelineAttachment implements OnChanges {
    @Input() attachment: Immutable.Map<string, any>;
    isImage: boolean;

    ngOnChanges() {
        this.isImage = isImage(this.attachment.get('url'));
    }

    // TODO: Remove broken image links
    // return el.find("img").error(function() { return this.remove(); });
}
