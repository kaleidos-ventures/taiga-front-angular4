import {CommonModule} from "@angular/common";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";

import {TgCommonModule} from "../common/common.module";
import {TgPipesModule} from "../pipes/pipes.module";
import {TgComponentsModule} from "../components/components.module";
import {TgAttachmentsModule} from "../attachments/attachments.module";
import {TgServicesModule} from "../services/services.module";
import {Filter} from "./filter.component";
import {FilterCategory} from "./filter-category/filter-category.component";
import {FilterApplied} from "./filter-applied.component";
import {FilterSaveCustom} from "./filter-save-custom.component";
import {FilterEffects} from "./filter.effects";

@NgModule({
    declarations: [
        Filter,
        FilterCategory,
        FilterApplied,
        FilterSaveCustom,
    ],
    exports: [
        Filter,
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
        EffectsModule.forFeature([FilterEffects]),
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TgFilterModule {}
