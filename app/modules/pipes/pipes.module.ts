import {NgModule} from "@angular/core";

import {MomentFormatPipe} from "./moment-format.pipe";
import {MomentFromNowPipe} from "./moment-from-now.pipe";
import {SizeFormatPipe} from "./size-format.pipe";

@NgModule({
    imports: [
    ],
    exports: [
        MomentFormatPipe,
        MomentFromNowPipe,
        SizeFormatPipe,
    ],
    declarations: [
        MomentFormatPipe,
        MomentFromNowPipe,
        SizeFormatPipe,
    ],
    providers: [
    ],
})
export class TgPipesModule {}
