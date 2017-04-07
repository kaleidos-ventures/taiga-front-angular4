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
 * File: project-logo-big.component.ts
 */

import {Component, Input, OnInit} from "@angular/core";
import * as Immutable from "immutable";
import {ProjectLogoService} from "../../services/project-logo.service";

@Component({
    selector: "tg-project-logo-big",
    template: `<img
        [src]='logo'
        [style.background]='color'
        [alt]='project.get("name")'
        [title]='project.get("name")' />`,
})
export class ProjectLogoBig implements OnInit {
    @Input() project;
    logo: string;
    color: string;

    constructor(private projectLogo: ProjectLogoService) {}

    ngOnInit() {
        this.color = "";
        this.logo = this.project.get("logo_big_url");

        if (!this.logo) {
            const generated_logo = this.projectLogo.getDefaultProjectLogo(this.project.get("slug"), this.project.get("id"));
            this.logo = generated_logo.src;
            this.color = generated_logo.color;
        }
    }
}
