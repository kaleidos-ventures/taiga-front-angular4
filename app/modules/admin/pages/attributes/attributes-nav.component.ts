import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "menu-tertiary sidebar"},
    selector: "tg-admin-attributes-nav",
    template: require("./attributes-nav.pug"),
})
export class AdminAttributesNav {
    @Input() project: Immutable.Map<string, any>;
    @Input() active: Immutable.Map<string, any>;
}
