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
 * File: attchments-full.controller.coffee
 */

import * as _ from "lodash";
import * as Immutable from "immutable"
import {sizeFormat} from "../../../libs/utils";
import {ConfigurationService} from "../../base/conf";
import {StorageService} from "../../base/storage";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import {OpenLightboxAction} from "../../../app.actions";

import {Component, Input, OnChanges} from "@angular/core";


@Component({
    selector: "tg-attachments-full",
    template: require("./attachments-full.pug"),
})
export class AttachmentsFull {
    @Input() attachments: Immutable.List<any>;
    uploadingAttachments: Immutable.List<any>;
    mode: any = "list";
    maxFileSize: any;
    maxFileSizeMsg: any;
    projectId: any;
    objId: any;
    type: any;
    editPermission: any;
    attachmentPreview: Immutable.Map<string, any>;

    constructor(private store: Store<IState>, private config: ConfigurationService, private storage: StorageService) {
        this.uploadingAttachments = Immutable.List();
        // this.maxFileSize = this.config.get("maxUploadFileSize", null);
        // if (this.maxFileSize) { this.maxFileSize = sizeFormat(this.maxFileSize); }
        // this.maxFileSizeMsg = this.maxFileSize ? this.translate.instant("ATTACHMENT.MAX_UPLOAD_SIZE", {maxFileSize: this.maxFileSize}) : "";
    }

    // uploadingAttachments() {
    //     return this.attachmentsFullService.uploadingAttachments;
    // }
    //
    // addAttachment(file) {
    //     const editable = (this.mode === "list");
    //
    //     return this.attachmentsFullService.addAttachment(this.projectId, this.objId, this.type, file, editable);
    // }

    setMode(mode) {
        this.mode = mode;

        return this.storage.set("attachment-mode", mode);
    }

    previewAttachment(attachment) {
        this.attachmentPreview = attachment;
        this.store.dispatch(new OpenLightboxAction("attachments.preview"));
    }

    // addAttachments(files) {
    //     return _.forEach(files, (file) => this.addAttachment(file));
    // }
    //
    // loadAttachments() {
    //     return this.attachmentsFullService.loadAttachments(this.type, this.objId, this.projectId);
    // }

    // deleteAttachment(toDeleteAttachment) {
    //     this.attachmentsPreviewService.fileId = null;
    //
    //     const title = this.translate.instant("ATTACHMENT.TITLE_LIGHTBOX_DELETE_ATTACHMENT");
    //     let message = this.translate.instant("ATTACHMENT.MSG_LIGHTBOX_DELETE_ATTACHMENT", {
    //         fileName: toDeleteAttachment.getIn(["file", "name"]),
    //     });
    //
    //     return this.confirm.askOnDelete(title, message)
    //         .then((askResponse) => {
    //             const onError = () => {
    //                 message = this.translate.instant("ATTACHMENT.ERROR_DELETE_ATTACHMENT", {errorMessage: message});
    //                 this.confirm.notify("error", null, message);
    //                 return askResponse.finish(false);
    //             };
    //
    //             const onSuccess = () => askResponse.finish();
    //
    //             return this.attachmentsFullService.deleteAttachment(toDeleteAttachment, this.type).then(onSuccess, onError);
    //     });
    // }

    // reorderAttachment(attachment, newIndex) {
    //     return this.attachmentsFullService.reorderAttachment(this.type, attachment, newIndex);
    // }
    //
    // updateAttachment(toUpdateAttachment) {
    //     return this.attachmentsFullService.updateAttachment(toUpdateAttachment, this.type);
    // }
    //
    // _isEditable() {
    //     if (this.projectService.project) {
    //         return this.projectService.hasPermission(this.editPermission);
    //     }
    //     return false;
    // }

    // showAttachments() {
    //     return this._isEditable() || this.attachmentsFullService.attachments.size;
    // }
}
