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
 * File: tasks-resource.service.coffee
 */

import * as Immutable from "immutable";
import * as _ from "lodash";
import {generateHash} from "../../libs/utils";

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {StorageService} from "../base/storage";
import {UrlsService} from "../base/urls";

@Injectable()
export class TasksResource {
    hashSuffix = "tasks-queryparams";
    hashSuffixStatusColumnModes = "tasks-statuscolumnmodels";
    hashSuffixUsRowModes = "tasks-usrowmodels";

    constructor(private http: HttpService,
                private urls: UrlsService,
                private storage: StorageService) {}

    get(projectId, taskId, extraParams) {
        const url = this.urls.resolve('tasks', taskId);
        let params = this.getQueryParams(projectId);
        params.project = projectId;

        params = _.extend({}, params, extraParams);

        return this.http.get(url, params);
    }

    getByRef(projectId, ref, extraParams) {
        const url = this.urls.resolve('tasks', "by_ref");
        let params = this.getQueryParams(projectId);
        params.project = projectId;
        params.ref = ref;

        params = _.extend({}, params, extraParams);

        return this.http.get(url, params);
    }

    filtersData(params) {
        const url = this.urls.resolve('task-filters');
        return this.http.get(url, params);
    }

    list(projectId: number, sprintId: number=null, userStoryId: number=null, params: any={}) {
        let url = this.urls.resolve("tasks");
        params = _.merge(params, {project: projectId});
        if (sprintId) { params.milestone = sprintId; }
        if (userStoryId) { params.user_story = userStoryId; }
        this.storeQueryParams(projectId, params);
        return this.http.get(url, params);
    }

    bulkCreate(projectId, sprintId, usId, data) {
        const url = this.urls.resolve("bulk-create-tasks");
        const params = {project_id: projectId, milestone_id: sprintId, us_id: usId, bulk_tasks: data};
        return this.http.post(url, params).map((result: any) => result.data);
    }

    upvote(taskId) {
        const url = this.urls.resolve("task-upvote", taskId);
        return this.http.post(url);
    }

    downvote(taskId) {
        const url = this.urls.resolve("task-downvote", taskId);
        return this.http.post(url);
    }

    watch(taskId) {
        const url = this.urls.resolve("task-watch", taskId);
        return this.http.post(url);
    }

    unwatch(taskId) {
        const url = this.urls.resolve("task-unwatch", taskId);
        return this.http.post(url);
    }

    bulkUpdateTaskTaskboardOrder(projectId, data) {
        const url = this.urls.resolve("bulk-update-task-taskboard-order");
        const params = {project_id: projectId, bulk_tasks: data};
        return this.http.post(url, params);
    }

    listValues(projectId, type) {
        const url = this.urls.resolve(type);
        const params = {project: projectId};
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

    storeStatusColumnModes(projectId, params) {
        const ns = `${projectId}:${this.hashSuffixStatusColumnModes}`;
        const hash = generateHash([projectId, ns]);
        return this.storage.set(hash, params);
    }

    getStatusColumnModes(projectId) {
        const ns = `${projectId}:${this.hashSuffixStatusColumnModes}`;
        const hash = generateHash([projectId, ns]);
        return this.storage.get(hash) || {};
    }

    storeUsRowModes(projectId, sprintId, params) {
        const ns = `${projectId}:${this.hashSuffixUsRowModes}`;
        const hash = generateHash([projectId, sprintId, ns]);

        return this.storage.set(hash, params);
    }

    getUsRowModes(projectId, sprintId) {
        const ns = `${projectId}:${this.hashSuffixUsRowModes}`;
        const hash = generateHash([projectId, sprintId, ns]);

        return this.storage.get(hash) || {};
    }

    listInAllProjects(params) {
        const url = this.urls.resolve("tasks");

        const httpOptions = {
            headers: {
                "x-disable-pagination": "1",
            },
        };

        return this.http.get(url, params, httpOptions);
    }
}
