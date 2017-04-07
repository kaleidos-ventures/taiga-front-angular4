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
 * File: navigation-bar.directive.coffee
 */

import {Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import {defineImmutableProperty} from "../../libs/utils";
import { ConfigurationService } from "../base/conf";
import { CurrentUserService } from "../services/current-user.service";

@Component({
    selector: "tg-navigation-bar",
    template: require("./navigation-bar.pug"),
})
export class NavigationBar {
    @Input() projects: any;
    @Input() user: any;
    @Output() logout: EventEmitter<any>;
    @Output() login: EventEmitter<any>;
    @Output() feedback: EventEmitter<any>;
    isAuthenticated: any = true;
    isEnabledHeader: any = true;
    publicRegisterEnabled: boolean;

    constructor(conf: ConfigurationService) {
        this.login = new EventEmitter();
        this.logout = new EventEmitter();
        this.feedback = new EventEmitter();
        this.publicRegisterEnabled = conf.get("publicRegisterEnabled", false);
    }
}
