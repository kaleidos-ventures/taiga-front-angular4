import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-header",
    template: require("./detail-header.pug"),
})
export class DetailHeader {
    @Input() project: Immutable.Map<string,any>;
    @Input() item: Immutable.Map<string,any>;
    @Input() type: string;
    @Input() canEdit: boolean;
}
