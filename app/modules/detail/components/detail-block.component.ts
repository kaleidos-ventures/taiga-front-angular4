import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-block",
    template: require("./detail-block.pug"),
})
export class DetailBlock {
    @Input() item: Immutable.Map<string,any>;
    @Input() canEdit: boolean;
}
