import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

import {TgBaseModule} from "../base/base.module";
import {TgCommonModule} from "../common/common.module";
import {TgComponentsModule} from "../components/components.module";
import {TgPipesModule} from "../pipes/pipes.module";

import { Card } from "./card.component";
import { CardCompletion } from "./components/card-completion/card-completion.component";
import { CardData } from "./components/card-data/card-data.component";
import { CardOwner } from "./components/card-owner/card-owner.component";
import { CardSlideshow } from "./components/card-slideshow/card-slideshow.component";
import { CardTags } from "./components/card-tags/card-tags.component";
import { CardTasks } from "./components/card-tasks/card-tasks.component";
import { CardTitle } from "./components/card-title/card-title.component";
import { CardUnfold } from "./components/card-unfold/card-unfold.component";

@NgModule({
    imports: [
        CommonModule,
        TgPipesModule,
        TgCommonModule,
        TgComponentsModule,
        TgBaseModule,
        RouterModule.forChild([]),
        TranslateModule.forChild({}),
    ],
    exports: [
        Card,
    ],
    declarations: [
        Card,
        CardTags,
        CardOwner,
        CardTitle,
        CardData,
        CardCompletion,
        CardTasks,
        CardSlideshow,
        CardUnfold,
    ],
    providers: [
    ],
})
export class TgCardsModule {}
