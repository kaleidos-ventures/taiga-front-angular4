import {CommonModule} from "@angular/common";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";
import { ReactiveFormsModule } from '@angular/forms';

import {TgCommonModule} from "../common/common.module";
import {TgPipesModule} from "../pipes/pipes.module";
import {TgComponentsModule} from "../components/components.module";
import {TgAttachmentsModule} from "../attachments/attachments.module";
import {TgServicesModule} from "../services/services.module";
import {UserSettingsPage} from "./user-settings.component";
import {UserSettingsNavigation} from "./navigation/navigation.component";
import {UserSettingsForm} from "./user-settings-form/user-settings-form.component";
import {DeleteAccountLightbox} from "./delete-account-lightbox/delete-account-lightbox.component";
import {ChangePasswordPage} from "./change-password.component";
import {ChangePasswordForm} from "./change-password-form/change-password-form.component";
import {MailNotificationsPage} from "./mail-notifications.component";
import {MailNotificationPolicy} from "./mail-notification-policy/mail-notification-policy.component";
import {UserSettingsEffects} from "./user-settings.effects";

@NgModule({
    declarations: [
        UserSettingsPage,
        UserSettingsNavigation,
        UserSettingsForm,
        DeleteAccountLightbox,
        ChangePasswordPage,
        ChangePasswordForm,
        MailNotificationsPage,
        MailNotificationPolicy,
    ],
    exports: [
        UserSettingsPage,
        ChangePasswordPage,
        MailNotificationsPage,
    ],
    imports: [
        CommonModule,
        TgCommonModule,
        TgComponentsModule,
        TgAttachmentsModule,
        TgServicesModule,
        TgPipesModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule,
        TranslateModule.forChild({}),
        RouterModule.forChild([
            { path: "user-settings/user-profile", component: UserSettingsPage},
            { path: "user-settings/user-change-password", component: ChangePasswordPage},
            { path: "user-settings/mail-notifications", component: MailNotificationsPage},
        ]),
        EffectsModule.forFeature([UserSettingsEffects]),
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserSettingsModule {}
