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
import {KanbanModule} from "../kanban/kanban.module";
import {TaskboardPage} from "./taskboard.component";
import {TaskboardHeader} from "./taskboard-header/taskboard-header.component";
import {TaskboardFilters} from "./taskboard-filters/taskboard-filters.component";
import {TaskboardCurrentUser} from "./taskboard-current-user/taskboard-current-user.component";
import {TaskboardMembers} from "./taskboard-members/taskboard-members.component";
import {TaskboardMemberStats} from "./taskboard-member-stats/taskboard-member-stats.component";
import {TaskboardSprintSummary} from "./taskboard-sprint-summary/taskboard-sprint-summary.component";
import {TaskboardGraph} from "./taskboard-graph.component";
import {TaskboardZoom} from "./taskboard-zoom.component";
import {TaskboardEffects} from "./taskboard.effects";

@NgModule({
    declarations: [
        TaskboardPage,
        TaskboardHeader,
        TaskboardFilters,
        TaskboardCurrentUser,
        TaskboardMemberStats,
        TaskboardMembers,
        TaskboardZoom,
        TaskboardSprintSummary,
        TaskboardGraph,
    ],
    exports: [
        TaskboardPage,
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
        KanbanModule,
        RouterModule.forChild([
            { path: "project/:slug/taskboard/:sprintSlug", component: TaskboardPage },
        ]),
        EffectsModule.forFeature([TaskboardEffects]),
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TaskboardModule {}
