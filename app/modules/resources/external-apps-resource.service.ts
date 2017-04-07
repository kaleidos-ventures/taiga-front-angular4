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
 * File: external-apps-resource.service.coffee
 */

import * as Immutable from "immutable";

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {UrlsService} from "../base/urls";

@Injectable()
export class ExternalAppsResource {
    constructor(private urls: UrlsService,
                private http: HttpService) {}

    getApplicationToken(applicationId, state) {
        let url = this.urls.resolve("applications");
        url = `${url}/${applicationId}/token?state=${state}`;
        return this.http.get(url).map((result: any) => Immutable.fromJS(result.data));
    }

    authorizeApplicationToken(applicationId, state) {
        let url = this.urls.resolve("application-tokens");
        url = `${url}/authorize`;
        const data = {
            state,
            application: applicationId,
        };

        return this.http.post(url, data).map((result: any) => Immutable.fromJS(result.data));
    }
}
