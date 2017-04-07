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
 * File: modules/base/storage.coffee
 */

import {Injectable} from "@angular/core";
import * as _ from "lodash";

@Injectable()
export class StorageService {
    get(key, _default= null) {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return _default || null;
        }

        return JSON.parse(serializedValue);
    }

    set(key, val) {
        if (_.isObject(key)) {
            return _.each(key, (val, key) => {
                return this.set(key, val);
            });
        } else {
            return localStorage.setItem(key, JSON.stringify(val));
        }
    }

    contains(key) {
        const value = this.get(key);
        return (value !== null);
    }

    remove(key) {
        return localStorage.removeItem(key);
    }

    clear() {
        return localStorage.clear();
    }
}
