import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";

import {TgCommonModule} from "../common/common.module";
import {TgPipesModule} from "../pipes/pipes.module";
import {TgComponentsModule} from "../components/components.module";
import {TgServicesModule} from "../services/services.module";
import {TgFilterModule} from "../filter/filter.module";
import {IssuesPage} from "./issues.component";
import {IssuesTable} from "./issues-table.component";
import {IssuesStatusInlineEdition} from "./issues-status-inline-edition.component";
import {IssuesEffects} from "./issues.effects";

@NgModule({
    declarations: [
        IssuesPage,
        IssuesTable,
        IssuesStatusInlineEdition,
    ],
    exports: [
        IssuesPage,
    ],
    imports: [
        CommonModule,
        TgCommonModule,
        TgComponentsModule,
        TgServicesModule,
        TgPipesModule,
        TgFilterModule,
        FormsModule,
        StoreModule,
        TranslateModule.forChild({}),
        RouterModule.forChild([
            { path: "project/:slug/issues", component: IssuesPage },
        ]),
        EffectsModule.forFeature([IssuesEffects]),
    ],
    providers: [
    ],
})
export class IssuesModule {}
