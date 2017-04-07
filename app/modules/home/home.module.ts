import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";

import { TgCommonModule } from "../common/common.module";
import { TgComponentsModule } from "../components/components.module";
import { CurrentUserService } from "../services/current-user.service";
import { Duty } from "./duties/duty.component";
import {Home} from "./home.component";
import { HomeProjectList } from "./projects/home-project-list.component";
import { WorkingOn } from "./working-on/working-on.component";

import {HomeEffects} from "./home.effects";
import {homeReducer} from "./home.store";

@NgModule({
    imports: [
        CommonModule,
        TgCommonModule,
        TgComponentsModule,
        TranslateModule.forChild({}),
        RouterModule.forChild([
            {path: "", component: Home},
        ]),
        EffectsModule.forFeature([HomeEffects]),
    ],
    exports: [
        Home,
    ],
    declarations: [
        Home,
        HomeProjectList,
        WorkingOn,
        Duty,
    ],
    providers: [
        CurrentUserService,
    ],
})
export class HomeModule {}
