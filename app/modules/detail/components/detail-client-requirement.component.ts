import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-client-requirement",
    template: require("./detail-client-requirement.pug"),
})
export class DetailClientRequirement {
    @Input() item: Immutable.Map<string,any>;
    @Input() canEdit: boolean;
}
