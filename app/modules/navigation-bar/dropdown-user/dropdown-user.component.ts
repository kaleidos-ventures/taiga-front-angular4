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
 * File: dropdown-user.directive.coffee
 */

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import * as _ from "lodash";
import {defineImmutableProperty} from "../../../libs/utils";
import { ConfigurationService } from "../../base/conf";
import { GlobalDataService } from "../../services/global-data.service";
// import { FeedbackService } from "../../feedback/feedback.service";

@Component({
    selector: "tg-dropdown-user",
    template: require("./dropdown-user.pug"),
})
export class DropdownUser {
    @Input() user: any;
    @Output() logout: EventEmitter<any>;
    @Output() feedback: EventEmitter<any>;
    isFeedbackEnabled: boolean;
    // userSettingsPlugins:any;

    constructor(private config: ConfigurationService,
                private router: Router) {
                 // private globalData: GlobalDataService) {
                 // private feedback: FeedbackService) {
        this.logout = new EventEmitter();
        this.feedback = new EventEmitter();
        this.isFeedbackEnabled = this.config.get("feedbackEnabled");
        // this.userSettingsPlugins = _.filter(globalData.get('userSettingsPlugins'), {userMenu: true});
    }

    onLogoutClick() {
        this.logout.emit();
        return false;
    }

    sendFeedback() {
        this.feedback.emit();
    }
}
