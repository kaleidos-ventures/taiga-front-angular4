import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import { FormsModule }   from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import {TranslateModule} from "@ngx-translate/core";

import {TgCommonModule} from "../common/common.module";
import {TgComponentsModule} from "../components/components.module";
import {DiscoverHomeOrderBy} from "./components/discover-home-order-by/discover-home-order-by.component";
import {DiscoverSearchBar} from "./components/discover-search-bar/discover-search-bar.component";
import {DiscoverSearchListHeader} from "./components/discover-search-list-header/discover-search-list-header.component";
import {FeaturedProjects} from "./components/featured-projects/featured-projects.component";
import {Highlighted} from "./components/highlighted/highlighted.component";
import {MostActive} from "./components/most-active/most-active.component";
import {MostLiked} from "./components/most-liked/most-liked.component";
import {DiscoverHome} from "./discover-home.component";
import {DiscoverSearchResults} from "./discover-search/discover-search-results.component";
import {DiscoverSearchResult} from "./discover-search/discover-search-result.component";
import {DiscoverSearch} from "./discover-search/discover-search.component";
import {DiscoverEffects} from "./discover.effects";

@NgModule({
    imports: [
        CommonModule,
        TgCommonModule,
        TgComponentsModule,
        FormsModule,
        TranslateModule.forChild({}),
        RouterModule.forChild([
            { path: "discover", component: DiscoverHome },
            { path: "discover/search", component: DiscoverSearch },
        ]),
        EffectsModule.forFeature([DiscoverEffects]),
    ],
    exports: [
        DiscoverHome,
        DiscoverSearch,
    ],
    declarations: [
        DiscoverHomeOrderBy,
        DiscoverSearchBar,
        DiscoverSearchListHeader,
        Highlighted,
        MostActive,
        MostLiked,
        DiscoverHome,
        DiscoverSearch,
        DiscoverSearchResults,
        DiscoverSearchResult,
        FeaturedProjects,
    ],
})
export class DiscoverModule {}
