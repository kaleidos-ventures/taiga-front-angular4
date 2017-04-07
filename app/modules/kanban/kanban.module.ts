import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";

import {TgCommonModule} from "../common/common.module";
import {TgCardsModule} from "../cards/cards.module";
import {TgComponentsModule} from "../components/components.module";
import {TgServicesModule} from "../services/services.module";
import {TgFilterModule} from "../filter/filter.module";
import {KanbanArchivedStatusIntro} from "./components/kanban-archived-status-intro/kanban-archived-status-intro.component";
import {KanbanBoardZoom} from "./components/kanban-board-zoom/kanban-board-zoom.component";
import {KanbanTableBody} from "./components/kanban-table-body/kanban-table-body.component";
import {KanbanTableHeader} from "./components/kanban-table-header/kanban-table-header.component";
import {KanbanTable} from "./components/kanban-table/kanban-table.component";
import {KanbanUsEditLightbox} from "./components/kanban-us-edit-lightbox/kanban-us-edit-lightbox.component";
import {KanbanPage} from "./kanban.component";
import {KanbanEffects} from "./kanban.effects";
import {KanbanSortableDirective} from "./sortable.directive";

@NgModule({
    declarations: [
        KanbanPage,
        KanbanTable,
        KanbanTableHeader,
        KanbanTableBody,
        KanbanBoardZoom,
        KanbanArchivedStatusIntro,
        KanbanUsEditLightbox,
        KanbanSortableDirective,
    ],
    exports: [
        KanbanPage,
        KanbanTable,
    ],
    imports: [
        CommonModule,
        TgCommonModule,
        TgCardsModule,
        TgComponentsModule,
        TgServicesModule,
        TgFilterModule,
        FormsModule,
        StoreModule,
        TranslateModule.forChild({}),
        RouterModule.forChild([
            { path: "project/:slug/kanban", component: KanbanPage },
        ]),
        EffectsModule.forFeature([KanbanEffects]),
    ],
    providers: [
    ],
})
export class KanbanModule {}
