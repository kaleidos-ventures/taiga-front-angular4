import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    selector: "tg-admin-attributes-tags-row",
    template: require("./attributes-tags-row.pug"),
})
export class AdminAttributesTagsRow {
    @Input() value: Immutable.Map<string, any>;
    @Input() type: string;
    @Input() merging: any = {};
    @Output() edit: EventEmitter<number>;
    @Output() startMerging: EventEmitter<string>;
    @Output() merge: EventEmitter<string>;
    @Output() cancelMerge: EventEmitter<string>;
    @Output() delete: EventEmitter<Immutable.Map<string, any>>;

    constructor() {
        this.edit = new EventEmitter();
        this.startMerging = new EventEmitter();
        this.merge = new EventEmitter();
        this.cancelMerge = new EventEmitter();
        this.delete = new EventEmitter();
    }

    addTagToMerge(tag) {
        if(this.merging.to && this.merging.to !== tag) {
            this.merge.emit(tag);
        }
    }

    hasTagsToMerge() {
        return _.some(_.values(this.merging.from))
    }
}
