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
 * File: modules/resources/history.coffee
 */

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {UrlsService} from "../base/urls";

@Injectable()
export class HistoryResource {
    constructor(private http: HttpService,
                private urls: UrlsService) {}

    get(type: string, objectId: number): any {
        let url = this.urls.resolve(`history/${type}`);
        return this.http.get(url + "/" + objectId);
    }

    editComment(type: string, objectId: number, activityId: number, comment: string): any {
        let url = this.urls.resolve(`history/${type}`);
        url = `${url}/${objectId}/edit_comment`;
        const params = {
            id: activityId,
        };
        const commentData = {
            comment,
        };
        return this.http.post(url, commentData, params).map((data: any) => {
            return data.data;
        });
    }

    getCommentHistory(type: string, objectId: number, activityId: number): any {
        let url = this.urls.resolve(`history/${type}`);
        url = `${url}/${objectId}/comment_versions`;
        const params = {id: activityId};
        return this.http.get(url, params).map((data: any) => {
            return data.data;
        });
    }

    deleteComment(type: string, objectId: number, activityId: number): any {
        let url = this.urls.resolve(`history/${type}`);
        url = `${url}/${objectId}/delete_comment`;
        const params = {id: activityId};
        return this.http.post(url, null, params).map((data: any) => {
            return data.data;
        });
    }

    undeleteComment(type: string, objectId: number, activityId: number): any {
        let url = this.urls.resolve(`history/${type}`);
        url = `${url}/${objectId}/undelete_comment`;
        const params = {id: activityId};
        return this.http.post(url, null, params).map((data: any) => {
            return data.data;
        });
    }
}
