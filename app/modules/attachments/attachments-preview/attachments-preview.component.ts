/*
 * Copyright (C) 2014-2015 Taiga Agile LLC <taiga@taiga.io>
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
 * File: attchments-preview.controller.coffee
 */

import {defineImmutableProperty, isImage} from "../../../libs/utils";
import {Component, Input, OnChanges} from "@angular/core"
import * as Immutable from "immutable";

@Component({
    selector: "tg-attachments-preview-lightbox",
    template: require("./attachments-preview.pug"),
})
export class AttachmentsPreviewLightbox implements OnChanges {
    @Input() attachments: Immutable.List<any>;
    @Input() initial: Immutable.Map<string, any>;
    images: Immutable.List<any>;
    currentPosition: number;
    current: Immutable.Map<string, any>;

    constructor() {
        this.attachments = Immutable.List();
    }

    ngOnChanges(changes) {
        if (changes.attachments) {
            this.images = this.attachments.filter((att) => isImage(att.get('name')))
                                          .filter((att) => !att.get('is_deprecated')).toList();
        }
        if (changes.attachments || changes.initial) {
            this.currentPosition = this.images.findIndex((img) => Immutable.is(img, this.initial))
            this.current = this.images.get(this.currentPosition)
        }
    }

    next() {
        if (this.currentPosition === (this.images.size - 1)) {
            this.currentPosition = 0
        } else {
            this.currentPosition++;
        }
        this.current = this.images.get(this.currentPosition)
    }

    previous() {
        if (this.currentPosition === 0) {
            this.currentPosition = (this.images.size - 1)
        } else {
            this.currentPosition--;
        }
        this.current = this.images.get(this.currentPosition)
    }
}
