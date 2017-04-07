import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-attributes-custom-fields-row",
    template: require("./attributes-custom-fields-row.pug"),
})
export class AdminAttributesCustomFieldsRow {
    @Input() value: Immutable.Map<string, any>;
    @Input() type: string;
    @Output() edit: EventEmitter<number>;
    @Output() delete: EventEmitter<Immutable.Map<string, any>>;

    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
    }
}
