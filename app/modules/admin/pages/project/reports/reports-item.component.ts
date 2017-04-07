import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-reports-item",
    template: require("./reports-item.pug"),
})
export class AdminReportsItem {
    @Input() project: Immutable.Map<string, any>;
    @Input() field: string;
    @Input() section: string;
    @Output() regenerate: EventEmitter<boolean>;

    constructor() {
        this.regenerate = new EventEmitter();
    }
}
