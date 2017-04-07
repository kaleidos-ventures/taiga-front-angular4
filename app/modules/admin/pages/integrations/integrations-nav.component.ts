import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "menu-tertiary sidebar"},
    selector: "tg-admin-integrations-nav",
    template: require("./integrations-nav.pug"),
})
export class AdminIntegrationsNav {
    @Input() project: Immutable.Map<string, any>;
    @Input() active: Immutable.Map<string, any>;
    @Output() setIntegration: EventEmitter<Immutable.Map<string, any>>;

    constructor() {
        this.setIntegration = new EventEmitter();
    }
}
