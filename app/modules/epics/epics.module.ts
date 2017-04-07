import {CommonModule} from "@angular/common";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";

import {TgCommonModule} from "../common/common.module";
import {TgCardsModule} from "../cards/cards.module";
import {TgAttachmentsModule} from "../attachments/attachments.module";
import {TgComponentsModule} from "../components/components.module";
import {TgServicesModule} from "../services/services.module";
import {EpicsPage} from "./epics.component";
import {EpicsEmpty} from "./epics-empty.component";
import {EpicsTable} from "./epics-table/epics-table.component";
import {EpicsTableColumnToggle} from "./epics-table/epics-table-column-toggle.component";
import {EpicRow} from "./epics-table/epic-row.component";
import {EpicsStoryRow} from "./epics-table/epics-story-row.component";
import {CreateEpicForm} from "./create-epic-form/create-epic-form.component";
import {EpicsEffects} from "./epics.effects";

@NgModule({
    declarations: [
        EpicsPage,
        EpicsEmpty,
        EpicsTable,
        EpicsTableColumnToggle,
        EpicRow,
        EpicsStoryRow,
        CreateEpicForm,
    ],
    exports: [
        EpicsPage,
    ],
    imports: [
        CommonModule,
        TgCommonModule,
        TgCardsModule,
        TgComponentsModule,
        TgServicesModule,
        TgAttachmentsModule,
        ReactiveFormsModule,
        StoreModule,
        TranslateModule.forChild({}),
        RouterModule.forChild([
            { path: "project/:slug/epics", component: EpicsPage },
        ]),
        EffectsModule.forFeature([EpicsEffects]),
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class EpicsModule {}
