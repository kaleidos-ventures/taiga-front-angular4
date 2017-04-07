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
 * File: modules/common/components.coffee
 */

import {Component, Input, OnChanges} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import * as moment from "moment";

//############################################################################
//# Date Range Directive (used mainly for sprint date range)
//############################################################################

@Component({
    selector: "tg-date-range",
    template: "<span>{{formatedRange}}</span>",
})
export class DateRange implements OnChanges {
    @Input() first: string;
    @Input() second: string;
    formatedRange: string;

    constructor(private translate: TranslateService) {}

    ngOnChanges() {
        const prettyDate = this.translate.instant("BACKLOG.SPRINTS.DATE");
        const initDate = moment(this.first).format(prettyDate);
        const endDate = moment(this.second).format(prettyDate);
        this.formatedRange = `${initDate}-${endDate}`;
    }
}
