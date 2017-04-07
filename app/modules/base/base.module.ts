import {NgModule} from "@angular/core";

import {TgCommonModule} from "../common/common.module";

import {ConfigurationService} from "./conf";
import {HttpService} from "./http";
import {StorageService} from "./storage";
import {UrlsService} from "./urls";

@NgModule({
    providers: [
        UrlsService,
        StorageService,
        HttpService,
        ConfigurationService,
    ],
})
export class TgBaseModule {}
