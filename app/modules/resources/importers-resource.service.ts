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
 * File: modules/resources/importers.coffee
 */

import * as Immutable from "immutable";

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {UrlsService} from "../base/urls";

@Injectable()
export class TrelloResource {
    constructor(private urls: UrlsService,
                private http: HttpService) {}

    getAuthUrl(url) {
        url = this.urls.resolve("importers-trello-auth-url");
        return this.http.get(url);
    }

    authorize(verifyCode) {
        const url = this.urls.resolve("importers-trello-authorize");
        return this.http.post(url, {code: verifyCode});
    }

    listProjects(token) {
        const url = this.urls.resolve("importers-trello-list-projects");
        return this.http.post(url, {token}).map((response: any) => Immutable.fromJS(response.data));
    }

    listUsers(token, projectId) {
        const url = this.urls.resolve("importers-trello-list-users");
        return this.http.post(url, {token, project: projectId}).map((response: any) => Immutable.fromJS(response.data));
    }

    importProject(token, name, description, projectId, userBindings, keepExternalReference, isPrivate) {
        const url = this.urls.resolve("importers-trello-import-project");
        const data = {
            token,
            name,
            description,
            project: projectId,
            users_bindings: userBindings.toJS(),
            keep_external_reference: keepExternalReference,
            is_private: isPrivate,
            template: "kanban",
        };
        return this.http.post(url, data);
    }
}

@Injectable()
export class JiraResource {
    constructor(private urls: UrlsService,
                private http: HttpService) {}

    getAuthUrl(jira_url) {
        const url = this.urls.resolve("importers-jira-auth-url") + "?url=" + jira_url;
        return this.http.get(url);
    }

    authorize(oauth_verifier) {
        const url = this.urls.resolve("importers-jira-authorize");
        return this.http.post(url, {oauth_verifier});
    }

    listProjects(jira_url, token) {
        const url = this.urls.resolve("importers-jira-list-projects");
        return this.http.post(url, {url: jira_url, token}).map((response: any) => Immutable.fromJS(response.data));
    }

    listUsers(jira_url, token, projectId) {
        const url = this.urls.resolve("importers-jira-list-users");
        return this.http.post(url, {url: jira_url, token, project: projectId}).map((response: any) => Immutable.fromJS(response.data));
    }

    importProject(jira_url, token, name, description, projectId, userBindings, keepExternalReference, isPrivate, projectType, importerType) {
        const url = this.urls.resolve("importers-jira-import-project");
        let projectTemplate = "kanban";
        if (projectType !== "kanban") {
            projectTemplate = "scrum";
        }

        const data = {
            url: jira_url,
            token,
            name,
            description,
            project: projectId,
            users_bindings: userBindings.toJS(),
            keep_external_reference: keepExternalReference,
            is_private: isPrivate,
            project_type: projectType,
            importer_type: importerType,
            template: projectTemplate,
        };
        return this.http.post(url, data);
    }
}

@Injectable()
export class GithubResource {
    constructor(private urls: UrlsService,
                private http: HttpService) {}

    getAuthUrl(callbackUri) {
        const url = this.urls.resolve("importers-github-auth-url") + "?uri=" + callbackUri;
        return this.http.get(url);
    }

    authorize(code) {
        const url = this.urls.resolve("importers-github-authorize");
        return this.http.post(url, {code});
    }

    listProjects(token) {
        const url = this.urls.resolve("importers-github-list-projects");
        return this.http.post(url, {token}).map((response: any) => Immutable.fromJS(response.data));
    }

    listUsers(token, projectId) {
        const url = this.urls.resolve("importers-github-list-users");
        return this.http.post(url, {token, project: projectId}).map((response: any) => Immutable.fromJS(response.data));
    }

    importProject(token, name, description, projectId, userBindings, keepExternalReference, isPrivate, projectType) {
        const url = this.urls.resolve("importers-github-import-project");

        const data = {
            token,
            name,
            description,
            project: projectId,
            users_bindings: userBindings.toJS(),
            keep_external_reference: keepExternalReference,
            is_private: isPrivate,
            template: projectType,
        };
        return this.http.post(url, data);
    }
}

@Injectable()
export class AsanaResource {
    constructor(private urls: UrlsService,
                private http: HttpService) {}

    getAuthUrl() {
        const url = this.urls.resolve("importers-asana-auth-url");
        return this.http.get(url);
    }

    authorize(code) {
        const url = this.urls.resolve("importers-asana-authorize");
        return this.http.post(url, {code});
    }

    listProjects(token) {
        const url = this.urls.resolve("importers-asana-list-projects");
        return this.http.post(url, {token}).map((response: any) => Immutable.fromJS(response.data));
    }

    listUsers(token, projectId) {
        const url = this.urls.resolve("importers-asana-list-users");
        return this.http.post(url, {token, project: projectId}).map((response: any) => Immutable.fromJS(response.data));
    }

    importProject(token, name, description, projectId, userBindings, keepExternalReference, isPrivate, projectType) {
        const url = this.urls.resolve("importers-asana-import-project");

        const data = {
            token,
            name,
            description,
            project: projectId,
            users_bindings: userBindings.toJS(),
            keep_external_reference: keepExternalReference,
            is_private: isPrivate,
            template: projectType,
        };
        return this.http.post(url, data);
    }
}
