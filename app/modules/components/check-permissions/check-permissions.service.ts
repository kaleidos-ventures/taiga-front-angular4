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
 * File: check-permissions.service.coffee
 */

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import * as Immutable from "immutable";

@Injectable()
export class CheckPermissionsService {
    project$: Observable<Immutable.Map<string, any>>;
    project: Immutable.Map<string, any>;

    constructor(private store: Store<IState>) {
        this.project$ = this.store.select((data) => data.getIn(['projects', 'current-project']))
        this.project$.subscribe((p) => this.project = p)
    }

    check(permission, not) {
        if (!this.project) { return false; }

        let exists = this.project.get("my_permissions").indexOf(permission) !== -1;
        return (not && !exists) || (!not && exists)
    }
}
