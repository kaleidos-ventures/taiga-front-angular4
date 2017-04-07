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
 * File: attchment.controller.coffee
 */

import {Component, Input, Output, EventEmitter} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UniversalValidators } from "ngx-validators";

import * as Immutable from "immutable";

@Component({
    selector: "tg-attachment",
    template: require("./attachment.pug"),
})
export class Attachment {
    @Input() attachment: Immutable.Map<string, any>;
    @Output() update: EventEmitter<any>;
    @Output() delete: EventEmitter<number>;
    @Output() preview: EventEmitter<any>;
    attachmentForm: FormGroup;
    editable: boolean;

    constructor(private fb: FormBuilder) {
        this.update = new EventEmitter();
        this.delete = new EventEmitter();
        this.preview = new EventEmitter();
    }

    ngOnInit() {
        this.attachmentForm = this.fb.group({
            description: [this.attachment.get('description'), UniversalValidators.maxLength(140)],
            isDeprecated: [false, ],
        });
    }

    ngOnChanges(changes) {
        if (changes.attachment) {
            this.attachmentForm.controls.description.setValue(this.attachment.get('description'));
            this.attachmentForm.controls.isDeprecated.setValue(this.attachment.get('is_deprecated'));
        }
    }

    editMode(mode) {
        this.editable = mode;
    }

    updateAttachment() {
        this.editable = false;
        this.update.emit({attachmentId: this.attachment.get('id'),
                          descrption: this.attachmentForm.controls.description.value,
                          is_deprecated: this.attachmentForm.controls.isDeprecated.value});
        return false;
    }
}
