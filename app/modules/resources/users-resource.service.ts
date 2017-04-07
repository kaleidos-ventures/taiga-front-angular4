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
 * File: users-resource.service.coffee
 */

import * as Immutable from "immutable";
import * as _ from "lodash";

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {UrlsService} from "../base/urls";
import {PaginateResponseService} from "../services/paginate-response.service";

@Injectable()
export class UsersResource {
    constructor(private urls: UrlsService,
                private http: HttpService,
                private paginateResponse: PaginateResponseService) {}

    contacts(userId: number, options: any= {}): any {
        const url = this.urls.resolve("user-contacts", userId);
        const httpOptions = {headers: {}};

        if (!options.enablePagination) {
            httpOptions.headers["x-disable-pagination"] =  "1";
        }

        return this.http.get(url, {}, httpOptions)
            .map((result: any) => result.data);
    }

    getUserByUsername(username) {
        const url = this.urls.resolve("by_username");
        const params = {
            username,
        };

        return this.http.get(url, params);
    }

    getStats(userId) {
        const url = this.urls.resolve("user-stats", userId);
        return this.http.get(url);
    }

    getContacts(userId, excludeProjectId=null) {
        const url = this.urls.resolve("user-contacts", userId);

        const params: any = {};
        if (excludeProjectId != null) { params.exclude_project = excludeProjectId; }

        return this.http.get(url, params)
    }

    getLiked(userId, page, type, q) {
        const url = this.urls.resolve("user-liked", userId);

        const params: any = {};
        if (page != null) { params.page = page; }
        if (type != null) { params.type = type; }
        if (q != null) { params.q = q; }

        params.only_relevant = true;

        return this.http.get(url, params, {headers: {"x-lazy-pagination": true}});
    }

    getVoted(userId, page, type, q) {
        const url = this.urls.resolve("user-voted", userId);

        const params: any = {};
        if (page != null) { params.page = page; }
        if (type != null) { params.type = type; }
        if (q != null) { params.q = q; }

        return this.http.get(url, params, {headers: {"x-lazy-pagination": true}});
    }

    getWatched(userId, page, type, q) {
        const url = this.urls.resolve("user-watched", userId);

        const params: any = {};
        if (page != null) { params.page = page; }
        if (type != null) { params.type = type; }
        if (q != null) { params.q = q; }

        return this.http.get(url, params, {headers: {"x-lazy-pagination": true}});
    }

    getProfileTimeline(userId, page) {
        const params = { page, };

        let url = this.urls.resolve("timeline-profile", userId);

        return this.http.get(url, params, {headers: {"x-lazy-pagination": true}});
    }

    getUserTimeline(userId, page) {
        const params = {
            page,
            only_relevant: true,
        };

        let url = `${this.urls.resolve("timeline-user")}/${userId}`;

        return this.http.get(url, params, {
            headers: {
                "x-lazy-pagination": true,
            },
        });
    }
}
