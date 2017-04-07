import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-attributes-points-row",
    template: require("./attributes-points-row.pug"),
})
export class AdminAttributesPointsRow {
    @Input() value: Immutable.Map<string, any>;
    @Input() type: string;
    @Output() edit: EventEmitter<number>;
    @Output() delete: EventEmitter<Immutable.Map<string, any>>;

    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
    }
}
