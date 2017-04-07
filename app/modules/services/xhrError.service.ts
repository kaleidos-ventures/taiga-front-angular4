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
 * File: xhrError.service.coffee
 */

import {Injectable} from "@angular/core";
import * as Promise from "bluebird";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable()
export class xhrError {
    constructor(private errorHandling: ErrorHandlingService) { }

    notFound() {
        return this.errorHandling.notfound();
    }

    permissionDenied() {
        return this.errorHandling.permissionDenied();
    }

    response(xhr) {
        if (xhr) {
            if (xhr.status === 404) {
                this.notFound();
            } else if (xhr.status === 403) {
                this.permissionDenied();
            }
        }

        return Promise.reject(xhr);
    }
}
