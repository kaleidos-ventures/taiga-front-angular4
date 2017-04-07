import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-tribe-linked",
    template: require("./detail-tribe-linked.pug"),
})
export class DetailTribeLinked {
    @Input() item: Immutable.Map<string,any>;
}
