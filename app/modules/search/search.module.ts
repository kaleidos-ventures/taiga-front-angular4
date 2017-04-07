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
import {SearchPage} from "./search.component";
import {SearchFilter} from "./search-filter.component";
import {SearchResultsTable} from "./search-results-table.component";
import {EmptySearchResults} from "./empty-search-results.component";
import {SearchEffects} from "./search.effects";

@NgModule({
    declarations: [
        SearchPage,
        SearchFilter,
        SearchResultsTable,
        EmptySearchResults,
    ],
    exports: [
        SearchPage,
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
            { path: "project/:slug/search", component: SearchPage },
        ]),
        EffectsModule.forFeature([SearchEffects]),
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule {}
