import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

import {TgBaseModule} from "../base/base.module";
import {TgCommonModule} from "../common/common.module";
import {TgComponentsModule} from "../components/components.module";
import {TgPipesModule} from "../pipes/pipes.module";

import { AttachmentsFull } from "./attachments-full/attachments-full.component";
import { AttachmentsSimple } from "./attachments-simple/attachments-simple.component";
import { Attachment } from "./attachment/attachment.component";
import { AttachmentGallery } from "./attachment/attachment-gallery.component";
import { AttachmentLink } from "./attachment-link/attachment-link.component";
import { AttachmentsHeader } from "./attachments-header/attachments-header.component";
import { AttachmentsList } from "./attachments-list/attachments-list.component";
import { AttachmentsGallery } from "./attachments-gallery/attachments-gallery.component";
import { AttachmentsPreviewLightbox } from "./attachments-preview/attachments-preview.component";

@NgModule({
    imports: [
        CommonModule,
        TgPipesModule,
        TgCommonModule,
        TgComponentsModule,
        TgBaseModule,
        ReactiveFormsModule,
        RouterModule.forChild([]),
        TranslateModule.forChild({}),
    ],
    exports: [
        AttachmentsFull,
        AttachmentsSimple,
    ],
    declarations: [
        AttachmentsFull,
        AttachmentsSimple,
        Attachment,
        AttachmentGallery,
        AttachmentLink,
        AttachmentsHeader,
        AttachmentsList,
        AttachmentsGallery,
        AttachmentsPreviewLightbox,
    ],
    providers: [
    ],
})
export class TgAttachmentsModule {}
