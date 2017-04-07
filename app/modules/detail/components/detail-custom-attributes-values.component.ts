import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-custom-attributes-values",
    template: require("./detail-custom-attributes-values.pug"),
})
export class DetailCustomAttributesValues {
    @Input() attrs: Immutable.List<any>;
    @Input() values: Immutable.Map<string, any>;
    @Input() canEdit: boolean;
}
