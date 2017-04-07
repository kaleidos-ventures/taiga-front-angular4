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
 * File: userstories-resource.service.coffee
 */

import * as Immutable from "immutable";
import * as _ from "lodash";
import {generateHash} from "../../libs/utils";

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {StorageService} from "../base/storage";
import {UrlsService} from "../base/urls";

@Injectable()
export class UserstoriesResource {
    hashSuffix = "userstories-queryparams";

    constructor(private http: HttpService,
                private urls: UrlsService,
                private storage: StorageService) {}

    get(projectId, usId, extraParams) {
        let url = this.urls.resolve("userstory", usId);
        let params = this.getQueryParams(projectId);
        params.project = projectId;

        params = _.extend({}, params, extraParams);

        return this.http.get(url, params);
    }

    create(data) {
        let url = this.urls.resolve("userstories");
        return this.http.post(url, data);
    }

    patch(usId, data) {
        let url = this.urls.resolve("userstory", usId);
        return this.http.patch(url, data);
    }

    getByRef(projectId, ref, extraParams={}) {
        let params = this.getQueryParams(projectId);
        params.project = projectId;
        params.ref = ref;
        params = _.extend({}, params, extraParams);

        let url = this.urls.resolve("userstories") + "/by_ref";

        return this.http.get(url, params);
    }

    filtersData(params) {
        let url = this.urls.resolve("userstories-filters");
        return this.http.get(url, params);
    }

    listUnassigned(projectId, filters, pageSize) {
        let url = this.urls.resolve("userstories");
        let params = {project: projectId, milestone: "null"};
        params = _.extend({}, params, filters || {});
        this.storeQueryParams(projectId, params);

        return this.http.get(url, _.extend(params, {
            page_size: pageSize,
        }));
    }

    listAll(projectId, filters) {
        let params = {project: projectId};
        params = _.extend({}, params, filters || {});
        this.storeQueryParams(projectId, params);
        const url = this.urls.resolve("userstories");

        return this.http.get(url, params);
    }

    bulkCreate(projectId, status, bulk) {
        const data = {
            project_id: projectId,
            status_id: status,
            bulk_stories: bulk,
        };

        const url = this.urls.resolve("bulk-create-us");

        return this.http.post(url, data).map((response:any) => Immutable.fromJS(response.data)) ;
    }

    upvote(userStoryId) {
        const url = this.urls.resolve("userstory-upvote", userStoryId);
        return this.http.post(url);
    }

    downvote(userStoryId) {
        const url = this.urls.resolve("userstory-downvote", userStoryId);
        return this.http.post(url);
    }

    watch(userStoryId) {
        const url = this.urls.resolve("userstory-watch", userStoryId);
        return this.http.post(url);
    }

    unwatch(userStoryId) {
        const url = this.urls.resolve("userstory-unwatch", userStoryId);
        return this.http.post(url);
    }

    bulkUpdateBacklogOrder(projectId, data) {
        const url = this.urls.resolve("bulk-update-us-backlog-order");
        const params = {project_id: projectId, bulk_stories: data};
        return this.http.post(url, params);
    }

    bulkUpdateMilestone(projectId, milestoneId, data) {
        const url = this.urls.resolve("bulk-update-us-milestone");
        const params = {project_id: projectId, milestone_id: milestoneId, bulk_stories: data};
        return this.http.post(url, params);
    }

    bulkUpdateKanbanOrder(projectId, data) {
        const url = this.urls.resolve("bulk-update-us-kanban-order");
        const params = {project_id: projectId, bulk_stories: data};
        return this.http.post(url, params);
    }

    listValues(projectId, type) {
        let url = this.urls.resolve(type);
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

    storeShowTags(projectId, showTags) {
        const hash = generateHash([projectId, "showTags"]);
        return this.storage.set(hash, showTags);
    }

    getShowTags(projectId) {
        const hash = generateHash([projectId, "showTags"]);
        return this.storage.get(hash) || null;
    }

    listInAllProjects(params) {
        const url = this.urls.resolve("userstories");

        const httpOptions = {
            headers: {
                "x-disable-pagination": "1",
            },
        };

        return this.http.get(url, params, httpOptions);
    }

    listAllInProject(projectId) {
        const url = this.urls.resolve("userstories");

        const httpOptions = {
            headers: {
                "x-disable-pagination": "1",
            },
        };

        const params = {
            project: projectId,
        };

        return this.http.get(url, params, httpOptions)
            .map((result: any) => Immutable.fromJS(result.data));
    }

    listInEpic(epicIid) {
        const url = this.urls.resolve("userstories");

        const httpOptions = {
            headers: {
                "x-disable-pagination": "1",
            },
        };

        const params = {
            epic: epicIid,
            order_by: "epic_order",
            include_tasks: true,
        };

        return this.http.get(url, params, httpOptions)
            .map((result: any) => Immutable.fromJS(result.data));
    }
}
