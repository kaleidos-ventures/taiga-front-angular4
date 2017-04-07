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

import * as _ from "lodash";

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {UrlsService} from "../base/urls";

@Injectable()
export class MembershipsResource {
    constructor(private http: HttpService,
                private urls: UrlsService) {}

    get(id) {
        let url = this.urls.resolve("memberships", id)
        return this.http.get(url);
    }

    list(projectId, filters={}, enablePagination=true) {
        let url = this.urls.resolve("memberships")
        return this.http.get(url, {project: projectId})
    }

    listByUser(userId, filters) {
        let url = this.urls.resolve("memberships")
        let params = {user: userId};
        params = _.extend({}, params, filters || {});
        return this.http.get("memberships", params);
    }

    resendInvitation(id) {
        const url = this.urls.resolve("memberships");
        return this.http.post(`${url}/${id}/resend_invitation`, {});
    }

    bulkCreateMemberships(projectId, data, invitation_extra_text) {
        const url = this.urls.resolve("bulk-create-memberships");
        const params = {project_id: projectId, bulk_memberships: data, invitation_extra_text};
        return this.http.post(url, params);
    }
}
