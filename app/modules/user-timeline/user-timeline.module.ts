import {CommonModule} from "@angular/common";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

import {TgCommonModule} from "../common/common.module";
import {TgPipesModule} from "../pipes/pipes.module";
import {TgComponentsModule} from "../components/components.module";
import {TgAttachmentsModule} from "../attachments/attachments.module";
import {TgServicesModule} from "../services/services.module";

import {UserTimeline} from "./user-timeline.component";
import {UserTimelineService} from "./user-timeline.service";
import {UserTimelineItemTypeService} from "./user-timeline-item/user-timeline-item-type.service";
import {UserTimelineItemTitleService} from "./user-timeline-item/user-timeline-item-title.service";
import {UserTimelineItem} from "./user-timeline-item/user-timeline-item.component";
import {UserTimelineAttachment} from "./user-timeline-attachment/user-timeline-attachment.component";

@NgModule({
    declarations: [
        UserTimeline,
        UserTimelineItem,
        UserTimelineAttachment,
    ],
    exports: [
        UserTimeline,
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
        InfiniteScrollModule,
        RouterModule.forChild([]),
        // EffectsModule.forFeature([TeamEffects]),
    ],
    providers: [
        UserTimelineService,
        UserTimelineItemTitleService,
        UserTimelineItemTypeService,
    ]
})
export class TgUserTimelineModule {}
