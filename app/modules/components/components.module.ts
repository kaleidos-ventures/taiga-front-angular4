import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

import {TgBaseModule} from "../base/base.module";
import {TgCommonModule} from "../common/common.module";
import {TgPipesModule} from "../pipes/pipes.module";

import { AssignedItem } from "./assigned-to/assigned-item/assigned-item.component";
import { AssignedToSelector } from "./assigned-to/assigned-to-selector/assigned-to-selector.component";
import {Avatar} from "./avatar/avatar.component";
import { AvatarService } from "./avatar/avatar.service";
import { BelongToEpics } from "./belong-to-epics/belong-to-epics.component";
import { BoardZoom} from "./board-zoom/board-zoom.component";
import { LightboxClose } from "./lightbox/lightbox-close.component";
import { Lightbox } from "./lightbox/lightbox.component";
import { GenericSuccessLightbox } from "./lightbox/generic-success-lightbox/generic-success-lightbox.component";
import {LoaderFull} from "./loader/loader-full.component";
import { ProjectLogoBig } from "./project-logo-big/project-logo-big.component";
import { ProjectLogoSmall } from "./project-logo-small/project-logo-small.component";
import { ProjectMenu } from "./project-menu/project-menu.component";
import { TermsOfServiceAndPrivacyPolicyNotice } from "./terms-of-service-and-privacy-policy-notice/terms-of-service-and-privacy-policy-notice.component";
import { UserDisplay} from "./user-display/user-display.component";
import { PreloadImage} from "./preload-image/preload-image.component";
import {ConfirmAsk} from "./confirm/confirm-ask.component";
import {ConfirmAskChoice} from "./confirm/confirm-ask-choice.component";
import {FieldError} from "./field-error/field-error.component";
import {FeedbackLightbox} from "./feedback/feedback-lightbox.component";
import {SearchLightbox} from "./search/search-lightbox.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { ColorSelector } from "./color-selector/color-selector.component";
import { ColorSelectorService } from "./color-selector/color-selector.service";
import { CheckPermissionsService } from "./check-permissions/check-permissions.service";
import { IfPermDirective } from "./check-permissions/check-permissions.directive";
import { LoadingDirective, BigLoadingAux, SmallLoadingAux, MediumLoadingAux, TinyLoadingAux } from "./loading.directive";
import { IssuesBullet } from "./issues-bullet.component";
import { ProgressBar } from "./progress-bar.component";
import { TagsLine } from "./tags/tags-line.component";
import { TagsAddButton } from "./tags/tags-add-button/tags-add-button.component";
import { TagsAddInput } from "./tags/tags-add-input/tags-add-input.component";
import { TagsDropdown } from "./tags/tags-dropdown/tags-dropdown.component";
import { Tag } from "./tags/tag/tag.component";
import { Wysiwyg } from "./wysiwyg/wysiwyg.component";
import { WysiwygService } from "./wysiwyg/wysiwyg.service";
import { WysiwygCodeHightlighterService } from "./wysiwyg/wysiwyg-code-hightlighter.service";
import { MediumEditor } from "./wysiwyg/medium/medium.component";
import { JoyRide } from "./joy-ride/joy-ride.component";
import { SortableDirective } from "./sortable/sortable.directive";
import { BulkCreateLightbox } from "./bulk-create-lightbox/bulk-create-lightbox.component";
import { DatePicker} from "./date-picker/date-picker.component";

@NgModule({
    imports: [
        CommonModule,
        TgPipesModule,
        TgCommonModule,
        TgBaseModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([]),
        TranslateModule.forChild({}),
    ],
    exports: [
        Avatar,
        BelongToEpics,
        TermsOfServiceAndPrivacyPolicyNotice,
        ProjectLogoSmall,
        ProjectLogoBig,
        ProjectMenu,
        BoardZoom,
        Lightbox,
        LightboxClose,
        GenericSuccessLightbox,
        AssignedToSelector,
        AssignedItem,
        LoaderFull,
        UserDisplay,
        PreloadImage,
        ConfirmAsk,
        ConfirmAskChoice,
        FieldError,
        FeedbackLightbox,
        SearchLightbox,
        BulkCreateLightbox,
        DatePicker,
        ColorSelector,
        IfPermDirective,
        LoadingDirective,
        SortableDirective,
        IssuesBullet,
        ProgressBar,
        TagsLine,
        Wysiwyg,
        MediumEditor,
        JoyRide,
    ],
    declarations: [
        BoardZoom,
        Avatar,
        BelongToEpics,
        TermsOfServiceAndPrivacyPolicyNotice,
        ProjectLogoSmall,
        ProjectLogoBig,
        ProjectMenu,
        Lightbox,
        LightboxClose,
        GenericSuccessLightbox,
        AssignedToSelector,
        AssignedItem,
        LoaderFull,
        UserDisplay,
        PreloadImage,
        ConfirmAsk,
        ConfirmAskChoice,
        FieldError,
        FeedbackLightbox,
        SearchLightbox,
        BulkCreateLightbox,
        DatePicker,
        ColorSelector,
        IfPermDirective,
        LoadingDirective,
        SortableDirective,
        BigLoadingAux,
        SmallLoadingAux,
        MediumLoadingAux,
        TinyLoadingAux,
        IssuesBullet,
        ProgressBar,
        TagsLine,
        Tag,
        TagsAddButton,
        TagsAddInput,
        TagsDropdown,
        Wysiwyg,
        MediumEditor,
        JoyRide,
    ],
    providers: [
        AvatarService,
        CheckPermissionsService,
        WysiwygService,
        WysiwygCodeHightlighterService,
        ColorSelectorService,
    ],
    entryComponents: [
        BigLoadingAux,
        SmallLoadingAux,
        MediumLoadingAux,
        TinyLoadingAux,
    ]
})
export class TgComponentsModule {}
