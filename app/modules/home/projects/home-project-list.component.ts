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
 * File: home-project-list.directive.coffee
 */

import * as Immutable from "immutable";

import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from "@angular/core";

import {defineImmutableProperty} from "../../../libs/utils";
import { ProjectsService } from "../../projects/projects.service";
import { CurrentUserService  } from "../../services/current-user.service";

@Component({
    selector: "tg-home-project-list",
    template: require("./home-project-list.pug"),
})
export class HomeProjectList {
    @Input() projects: any;
    changed: number = 0;

    constructor() {}
}
