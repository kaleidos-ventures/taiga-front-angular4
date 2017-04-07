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
 * File: paginate-response.service.coffee
 */

import * as Immutable from "immutable";

import {Injectable} from "@angular/core";

@Injectable()
export class PaginateResponseService {
    paginate(result: Immutable.Map<string, any>) {
        const data = result.get("data");
        const headers = result.get("headers");
        const paginateResponse = Immutable.Map({
            data,
            next: !!headers.get("x-pagination-next"),
            prev: !!headers.get("x-pagination-prev"),
            current: headers.get("x-pagination-current"),
            count: headers.get("x-pagination-count"),
        });
        return paginateResponse;
    }
}
