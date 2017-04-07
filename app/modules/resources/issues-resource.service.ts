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
 * File: issues-resource.service.coffee
 */

import * as Immutable from "immutable";
import * as _ from "lodash";
import {generateHash} from "../../libs/utils";

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {StorageService} from "../base/storage";
import {UrlsService} from "../base/urls";

@Injectable()
export class IssuesResource {
    hashSuffix = "issues-queryparams";

    constructor(private http: HttpService,
                private urls: UrlsService,
                private storage: StorageService) {}

    get(projectId, issueId) {
        const url = this.urls.resolve("issues", issueId);
        const params = this.getQueryParams(projectId);
        params.project = projectId;
        return this.http.get(url, params);
    }

    getByRef(projectId, ref) {
        const url = this.urls.resolve("issues", "by_ref");
        const params = this.getQueryParams(projectId);
        params.project = projectId;
        params.ref = ref;
        return this.http.get(url, params);
    }

    list(projectId, filters) {
        let params = {project: projectId};
        params = _.extend({}, params, filters || {});
        this.storeQueryParams(projectId, params);
        const url = this.urls.resolve("issues");

        return this.http.get(url, params);
    }

    bulkCreate(projectId, data) {
        const url = this.urls.resolve("bulk-create-issues");
        const params = {project_id: projectId, bulk_issues: data};
        return this.http.post(url, params);
    }

    upvote(issueId) {
        const url = this.urls.resolve("issue-upvote", issueId);
        return this.http.post(url);
    }

    downvote(issueId) {
        const url = this.urls.resolve("issue-downvote", issueId);
        return this.http.post(url);
    }

    watch(issueId) {
        const url = this.urls.resolve("issue-watch", issueId);
        return this.http.post(url);
    }

    unwatch(issueId) {
        const url = this.urls.resolve("issue-unwatch", issueId);
        return this.http.post(url);
    }

    stats(projectId) {
        const url = `${this.urls.resolve("projects")}${projectId}/issues_stats`;
        return this.http.get(url);
    }

    filtersData(params) {
        const url = this.urls.resolve("issues-filters");
        return this.http.get(url, params);
    }

    listValues(projectId, type) {
        const url = this.urls.resolve(type);
        const params = {project: projectId};
        this.storeQueryParams(projectId, params);
        return this.http.get(url, params);
    }

    storeQueryParams(projectId, params) {
        const ns = `${projectId}:${this.hashSuffix}`;
        const hash = generateHash([projectId, ns]);
        return this.storage.set(hash, params);
    }

    getQueryParams(projectId) {
        const ns = `${projectId}:${this.hashSuffix}`;
        const hash = generateHash([projectId, ns]);
        return this.storage.get(hash) || {};
    }

    listInAllProjects(params) {
        const url = this.urls.resolve("issues");

        const httpOptions = {
            headers: {
                "x-disable-pagination": "1",
            },
        };

        return this.http.get(url, params, httpOptions);
    }
}
