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
 * File: modules/base/http.coffee
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {TranslateService} from "@ngx-translate/core";
import * as _ from "lodash";
import * as Immutable from "immutable";
import "rxjs/add/operator/toPromise";
import {StorageService} from "./storage";

@Injectable()
export class HttpService {
    constructor(private http: Http,
                private storage: StorageService,
                private translate: TranslateService) {}

    headers() {
        let headers = {};
        // Authorization
        const token = this.storage.get("token");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        // Accept-Language
        const lang = this.translate.currentLang;
        if (lang) {
            headers["Accept-Language"] = lang;
        }

        return headers;
    }

    request(options) {
        options.headers = _.assign({}, this.headers(), options.headers || {});
        options.params = _.mapValues(options.params, (value) => {
            if (_.isArray(value)) {
                return value.join();
            }
            return value;
        });
        if (options.data) {
            if (options.data instanceof FormData) {
                options.body = options.data;
            } else {
                options.headers["Content-Type"] = "application/json";
                options.body = JSON.stringify(options.data);
            }
        }

        return this.http.request(options.url, options)
                        .map(function(res:any) {
                            try {
                                res.data = Immutable.fromJS(res.json());
                            } catch(e) {
                                res.data = null;
                            }
                            return res;
                        }).catch((err) => {
                            try {
                                err.data = Immutable.fromJS(err.json());
                            } catch(e) {
                                err.data = Immutable.Map();
                            }
                            throw err;
                        })

    }

    get(url, params= null, options: any= {}) {
        options = _.assign({method: "GET", url}, options);
        if (params) { options.params = params; }

        // TODO: prevent duplicated http request

        return this.request(options);
    }

    post(url, data= null, params= null, options: any= {}) {
        options = _.assign({method: "POST", url}, options);

        if (data) { options.data = data; }
        if (params) { options.params = params; }

        return this.request(options);
    }

    put(url, data= null, params= null, options: any= {}) {
        options = _.assign({method: "PUT", url}, options);
        if (data) { options.data = data; }
        if (params) { options.params = params; }
        return this.request(options);
    }

    patch(url, data= null, params= null, options: any= {}) {
        options = _.assign({method: "PATCH", url}, options);
        if (data) { options.data = data; }
        if (params) { options.params = params; }
        return this.request(options);
    }

    delete(url, data= null, params= null, options: any= {}) {
        options = _.assign({method: "DELETE", url}, options);
        if (data) { options.data = data; }
        if (params) { options.params = params; }
        return this.request(options);
    }
}
