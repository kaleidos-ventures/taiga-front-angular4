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

import {Injectable} from "@angular/core";
import {sizeFormat} from "../../libs/utils";
import {ConfigurationService} from "../base/conf";
import {HttpService} from "../base/http";
import {UrlsService} from "../base/urls";
import {Observable} from "rxjs";

@Injectable()
export class UserSettingsResource {
    constructor(private config: ConfigurationService,
                private http: HttpService,
                private urls: UrlsService) {}

    changeAvatar(file) {
        const maxFileSize = this.config.get("maxUploadFileSize", null);
        if (maxFileSize && (file.size > maxFileSize)) {
            const response = {
                status: 413,
                data: {
                    _error_message: `'${file.name}' (${sizeFormat(file.size)}) is too heavy for our oompa
                                     loompas, try it with a smaller than (${sizeFormat(maxFileSize)})`,
                },
            };
            Observable.throw(response);
        }

        let data = new FormData();
        data.append("avatar", file);
        const url = `${this.urls.resolve("users")}/change_avatar`;
        return this.http.post(url, data);
    }

    removeAvatar() {
        const url = `${this.urls.resolve("users")}/remove_avatar`;
        return this.http.post(url);
    }

    changePassword(currentPassword, newPassword) {
        const url = `${this.urls.resolve("users")}/change_password`;
        const data = {
            current_password: currentPassword,
            password: newPassword,
        };
        return this.http.post(url, data);
    }

    cancelAccount(userId) {
        const url = this.urls.resolve("user", userId);
        return this.http.delete(url);
    }

    cancelAccountWithToken(token) {
        const url = this.urls.resolve("users-cancel-account");
        return this.http.post(url, {token: token});
    }
}
