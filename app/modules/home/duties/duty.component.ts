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
 * File: duty.directive.coffee
 */

import {Component, Input} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "tg-duty",
    template: require("./duty.pug"),
})
export class Duty {
    @Input() duty: any;
    @Input() type: any;

    constructor(private translate: TranslateService) {}

    getDutyType() {
        if (this.duty) {
            if (this.duty.get("_name") === "epic") {
                return this.translate.instant("COMMON.EPIC");
            }
            if (this.duty.get("_name") === "us") {
                return this.translate.instant("COMMON.USER_STORY");
            }
            if (this.duty.get("_name") === "task") {
                return this.translate.instant("COMMON.TASK");
            }
            if (this.duty.get("_name") === "issue") {
                return this.translate.instant("COMMON.ISSUE");
            }
        }
    }
}
