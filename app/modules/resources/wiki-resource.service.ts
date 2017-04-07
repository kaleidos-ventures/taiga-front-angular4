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
 * File: wiki-resource.service.coffee
 */

import * as Immutable from "immutable";

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {UrlsService} from "../base/urls";

@Injectable()
export class WikiResource {
    constructor(private urls: UrlsService,
                private http: HttpService) {}

    get(wikiId) {
        const url = this.urls.resolve("wiki-page");
        return this.http.get(url);
    }

    getBySlug(projectId, slug) {
        const url = this.urls.resolve("wiki-by-slug");
        return this.http.get(url, {project: projectId, slug: slug});
    }

    list(projectId) {
        const url = this.urls.resolve("wiki");
        return this.http.get(url, {project: projectId});
    }

    update(wikiId, content, version) {
        const url = this.urls.resolve("wiki-page", wikiId);
        const data = {content, version}
        return this.http.patch(url, data);
    }

    delete(wikiId) {
        const url = this.urls.resolve("wiki-page", wikiId);
        return this.http.delete(url);
    }

    deleteLink(linkId) {
        const url = this.urls.resolve("wiki-link", linkId);
        return this.http.delete(url);
    }

    createLink(projectId, title) {
        const url = this.urls.resolve("wiki-links");
        return this.http.post(url, {project: projectId, title});
    }

    listLinks(projectId) {
        const url = this.urls.resolve("wiki-links");
        return this.http.get(url, {project: projectId});
    }

    getHistory(wikiId) {
        const url = this.urls.resolve("history/wiki", wikiId);

        const httpOptions = {
            headers: {
                "x-disable-pagination": "1",
            },
        };

        return this.http.get(url, null, httpOptions);
    }
}
