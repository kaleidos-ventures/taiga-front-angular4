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
 * File: like-project-button.controller.coffee
 */

import {Component, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import {OpenLightboxAction} from "../../../../app.actions";

@Component({
    selector: "tg-contact-project-button",
    template: require("./contact-project-button.pug"),
})
export class ContactProjectButton {
    @Input() layout: string;

    constructor(private store: Store<IState>) {}

    contactProject() {
        this.store.dispatch(new OpenLightboxAction("project.contact"));
    }
}
