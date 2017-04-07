import {CommonModule} from "@angular/common";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";

import {TgCommonModule} from "../common/common.module";
import {TgPipesModule} from "../pipes/pipes.module";
import {TgComponentsModule} from "../components/components.module";
import {TgAttachmentsModule} from "../attachments/attachments.module";
import {TgServicesModule} from "../services/services.module";
import {TeamPage} from "./team.component";
import {TeamHeader} from "./team-header/team-header.component";
import {TeamFilters} from "./team-filters/team-filters.component";
import {TeamCurrentUser} from "./team-current-user/team-current-user.component";
import {TeamMembers} from "./team-members/team-members.component";
import {TeamMemberStats} from "./team-member-stats/team-member-stats.component";
import {LeaveProject} from "./leave-project/leave-project.component";
import {TeamEffects} from "./team.effects";

@NgModule({
    declarations: [
        TeamPage,
        TeamHeader,
        TeamFilters,
        TeamCurrentUser,
        TeamMemberStats,
        TeamMembers,
        LeaveProject,
    ],
    exports: [
        TeamPage,
    ],
    imports: [
        CommonModule,
        TgCommonModule,
        TgComponentsModule,
        TgAttachmentsModule,
        TgServicesModule,
        TgPipesModule,
        FormsModule,
        StoreModule,
        TranslateModule.forChild({}),
        RouterModule.forChild([
            { path: "project/:slug/team", component: TeamPage },
        ]),
        EffectsModule.forFeature([TeamEffects]),
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TeamModule {}
