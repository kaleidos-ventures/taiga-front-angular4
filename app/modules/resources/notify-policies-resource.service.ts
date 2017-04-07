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
 * File: modules/resources/memberships.coffee
 */

import {Injectable} from "@angular/core";
import * as _ from "lodash";
import {HttpService} from "../base/http";
import {UrlsService} from "../base/urls";

@Injectable()
export class NotifyPoliciesResource {
    constructor(private http: HttpService,
                private urls: UrlsService) {}

    update(id, level) {
        let url = this.urls.resolve("notify-policy", id);
        return this.http.patch(url, {notify_level: level});
    }

    get(id) {
        let url = this.urls.resolve("notify-policy", id);
        return this.http.get(url);
    }

    list() {
        let url = this.urls.resolve("notify-policies");
        return this.http.get(url);
    }
}
