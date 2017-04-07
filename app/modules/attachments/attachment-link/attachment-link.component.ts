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
 * File: attachment-link.directive.coffee
 */

import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";
import {isImage, isPdf} from "../../../libs/utils";

@Component({
    selector: "tg-attachment-link",
    template: `<a class="e2e-attachment-link"
                  (click)="onClick($event)"
                  [href]="attachment.get('url')"
                  [title]="attachment.get('name')"
                  [download]="attachment.get('name')"
                  target="_blank">
                 <ng-content></ng-content>
               </a>`,
})
export class AttachmentLink {
    @Input() attachment: Immutable.Map<string, any>;
    @Output() preview: EventEmitter<Immutable.Map<string, any>>;

    constructor() {
        this.preview = new EventEmitter();
    }

    onClick(event) {
        if (isImage(this.attachment.get('name'))) {
            event.preventDefault();
            this.preview.emit(this.attachment);
        } else if (isPdf(this.attachment.get('name'))) {
            event.preventDefault();
            return window.open(this.attachment.get("url"));
        }
    }
}
