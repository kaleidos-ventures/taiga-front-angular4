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
 * File: user-resource.service.coffee
 */

import * as Immutable from "immutable";
import * as _ from "lodash";

import {Injectable} from "@angular/core";
import {HttpService} from "../base/http";
import {UrlsService} from "../base/urls";
import {Observable} from "rxjs";

@Injectable()
export class UserResource {
    constructor(private urls: UrlsService,
                private http: HttpService) {}

    getUserStorage(hash) {
        const url = this.urls.resolve("user-storage");
        return this.http.get(`${url}/${hash}`)
                        .map((result: any) => result.data)
                        .catch(() => Observable.of(Immutable.Map()));
    }

    setUserStorage(hash, data) {
        const url = this.urls.resolve("user-storage");
        if (_.isEmpty(data)) {
            return this.http.delete(`${url}/${hash}`);
        }
        return this.http.put(`${url}/${hash}`, {key: hash, value: data}).catch(() => {
            return this.http.post(`${url}`, {key: hash, value: data})
                            .map((result: any) => result.data);
        });
    }

    createUserStorage(key, value) {
        const url = this.urls.resolve("user-storage");

        const params = {
            key,
            value,
        };

        return this.http.post(url, params);
    }

    login(loginData) {
        const url = this.urls.resolve("auth");
        return this.http.post(url, loginData)
                        .map((data: any) => {
                            return Immutable.fromJS(data.data);
                        })
                        .catch((err) => {
                            return Observable.throw(err);
                        });
    }

    update(userId, userData) {
        const url = this.urls.resolve("user", userId);
        return this.http.patch(url, userData);
    }

    passwordRecover(username) {
        const url = this.urls.resolve("users-password-recovery");
        return this.http.post(url, {username: username});
    }

    register(registerData, type=null, existing=false) {
        const url = this.urls.resolve("auth-register");

        registerData.type = type ? type : "public"
        if (type == "private") {
            registerData.existing = existing
        }

        return this.http.post(url, registerData)
                        .map((data: any) => {
                            return Immutable.fromJS(data.data);
                        })
                        .catch((err) => {
                            return Observable.throw(err);
                        });
    }

    changePasswordFromRecovery(password, uuid) {
        const url = this.urls.resolve("users-change-password-from-recovery");
        return this.http.post(url, {password: password, password2: password, token: uuid});
    }

    changeEmail(email_token) {
        const url = this.urls.resolve("users-change-email");
        return this.http.post(url, {email_token});
    }
}
