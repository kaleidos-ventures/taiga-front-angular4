import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "menu-tertiary sidebar"},
    selector: "tg-admin-roles-nav",
    template: require("./permissions-roles-nav.pug"),
})
export class AdminRolesNav {
    @Input() project: Immutable.Map<string, any>;
    @Input() active: Immutable.Map<string, any>;
    @Output() setRole: EventEmitter<Immutable.Map<string, any>>;

    constructor() {
        this.setRole = new EventEmitter();
    }
}
