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
 * File: taskboard-zoom.directive.coffee
 */

import {Component, Input} from "@angular/core";
import { Store } from "@ngrx/store";
import { IState } from "../../app.store";
import { ZoomLevelService} from "../services/zoom-level.service";
import { ChangeTaskboardZoom } from "./taskboard.actions";

@Component({
    selector: "tg-taskboard-zoom",
    template: `
        <tg-board-zoom [levels]="levels" [value]="value" (changeZoom)="onChangeZoom($event)">
        </tg-board-zoom>`,
})
export class TaskboardZoom {
    @Input() value;
    levels: number;

    constructor(private store: Store<IState>, private zoomLevel: ZoomLevelService) {
        this.levels = zoomLevel.numOfLevels("taskboard");
    }

    onChangeZoom(level) {
        this.store.dispatch(new ChangeTaskboardZoom(level));
    }
}
