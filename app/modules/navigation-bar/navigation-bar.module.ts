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
 * File: navigation-bar.module.coffee
 */

import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

import {TgBaseModule} from "../base/base.module";
import {TgCommonModule} from "../common/common.module";
import {TgComponentsModule} from "../components/components.module";

import {DropdownProjectList} from "./dropdown-project-list/dropdown-project-list.component";
import {DropdownUser} from "./dropdown-user/dropdown-user.component";
import {NavigationBar} from "./navigation-bar.component";

@NgModule({
    imports: [
        CommonModule,
        TgCommonModule,
        TgBaseModule,
        TgComponentsModule,
        RouterModule.forChild([]),
        TranslateModule.forChild({}),
    ],
    exports: [
        NavigationBar,
    ],
    declarations: [
        NavigationBar,
        DropdownProjectList,
        DropdownUser,
    ],
    providers: [
    ],
})
export class NavigationBarModule {}
