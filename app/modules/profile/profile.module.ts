import {CommonModule} from "@angular/common";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";

import {TgCommonModule} from "../common/common.module";
import {TgCardsModule} from "../cards/cards.module";
import {TgComponentsModule} from "../components/components.module";
import {TgServicesModule} from "../services/services.module";
import {TgUserTimelineModule} from "../user-timeline/user-timeline.module";
import {ProfilePage} from "./profile.component";
import {ProfileTimeline} from "./profile-timeline.component";
import {ProfileBar} from "./profile-bar/profile-bar.component";
import {ProfileTabs} from "./profile-tabs/profile-tabs.component";
import {ProfileTab} from "./profile-tabs/profile-tab.component";
import {ProfileFavs} from "./profile-favs/profile-favs.component";
import {ProfileFavsFilter} from "./profile-favs/profile-favs-filter.component";
import {ProfileFavsItemTicket} from "./profile-favs/items/profile-favs-item-ticket.component";
import {ProfileFavsItemProject} from "./profile-favs/items/profile-favs-item-project.component";
import {ProfileSidebar} from "./profile-sidebar/profile-sidebar.component";
import {ProfileContacts} from "./profile-contacts/profile-contacts.component";
import {ProfileProjects} from "./profile-projects/profile-projects.component";
import {ProfileEffects} from "./profile.effects";

@NgModule({
    declarations: [
        ProfilePage,
        ProfileBar,
        ProfileTab,
        ProfileTabs,
        ProfileFavs,
        ProfileFavsFilter,
        ProfileFavsItemTicket,
        ProfileFavsItemProject,
        ProfileTimeline,
        ProfileSidebar,
        ProfileContacts,
        ProfileProjects,
    ],
    exports: [
        ProfilePage,
    ],
    imports: [
        CommonModule,
        TgCommonModule,
        TgCardsModule,
        TgComponentsModule,
        TgServicesModule,
        TgUserTimelineModule,
        FormsModule,
        StoreModule,
        TranslateModule.forChild({}),
        RouterModule.forChild([
            { path: "profile", component: ProfilePage },
            { path: "profile/:username", component: ProfilePage },
        ]),
        EffectsModule.forFeature([ProfileEffects]),
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule {}
