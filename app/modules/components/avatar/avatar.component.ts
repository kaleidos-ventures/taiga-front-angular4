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
 * File: avatar.directive.coffee
 */

import {Component, Input, OnChanges} from "@angular/core";
import * as Immutable from "immutable";
import {AvatarService} from "./avatar.service";

@Component({
    selector: "tg-avatar",
    template: `<img [attr.src]="avatar.url"
                    [style.background]="avatar.bg"
                    [attr.alt]="fullname"
                    [attr.title]="fullname" />
    `,
})
export class Avatar implements OnChanges {
    @Input() user: any;
    @Input() type: string = "normal";
    avatar: any;
    fullname: string;

    constructor(private avatarService: AvatarService) {}

    ngOnChanges() {
        this.avatar = this.avatarService.getAvatar(this.user, this.type);
        if (this.user instanceof Immutable.Map) {
            this.fullname = this.user.get("full_name_display") || this.user.get("full_name");
        } else if (this.user) {
            this.fullname = this.user.full_name_display || this.user.full_name;
        } else {
            this.fullname = "";
        }
    }
}
