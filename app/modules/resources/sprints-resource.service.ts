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
 * File: modules/resources/sprints.coffee
 */

import {Injectable} from "@angular/core";
import * as _ from "lodash";
import * as Immutable from "immutable";
import {UrlsService} from "../base/urls";
import {HttpService} from "../base/http";
import {StorageService} from "../base/storage";

@Injectable()
export class SprintsResource {
    constructor(private urls: UrlsService,
                private http: HttpService,
                private storage: StorageService) {}

    get(projectId, sprintId) {
        const url = this.urls.resolve("milestone", sprintId)
        return this.http.get(url);
    }

    getBySlug(projectId, slug, extraParams = {}) {
        const url = this.urls.resolve('milestone', "by_slug");
        let params = {
            project: projectId,
            slug: slug,
        }

        params = _.extend({}, params, extraParams);
        return this.http.get(url, params);
    }

    update(sprintId, data) {
        const url = this.urls.resolve("milestone", sprintId)
        return this.http.patch(url, data);
    }

    delete(sprintId) {
        const url = this.urls.resolve("milestone", sprintId)
        return this.http.delete(url);
    }

    create(projectId, data) {
        const url = this.urls.resolve("milestones")
        return this.http.post(url, _.extend({}, data, {project: projectId}));
    }

    stats(projectId, sprintId) {
        const url = this.urls.resolve("milestone", `${sprintId}/stats`)
        return this.http.get(url);
    }

    list(projectId, filters = {}) {
        const url = this.urls.resolve("milestones");
        let params = {project: projectId};
        params = _.extend({}, params, filters || {});
        return this.http.get(url, params).map((result) => {
            result.data = Immutable.Map()
                                   .set('sprints', result.data)
                                   .set(
                                       'closed',
                                       parseInt(result.headers.get("Taiga-Info-Total-Closed-Milestones"), 10),
                                   )
                                   .set(
                                       'open',
                                       parseInt(result.headers.get("Taiga-Info-Total-Opened-Milestones"), 10),
                                   )
            return result
        });
    }
}
