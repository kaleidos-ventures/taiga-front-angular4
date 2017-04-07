import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-created-by-display",
    template: require("./detail-created-by-display.pug"),
})
export class DetailCreatedByDisplay {
    @Input() user: Immutable.Map<string,any>;
    @Input() date: Date;
}
