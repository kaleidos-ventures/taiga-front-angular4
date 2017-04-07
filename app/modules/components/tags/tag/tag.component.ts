import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-tag",
    template: require("./tag.pug"),
})
export class Tag {
    @Input() tag: any;
    @Input() canEdit: boolean;
    @Output() delete: EventEmitter<string>
    loadingRemoveTag: boolean = false;

    constructor() {
        this.delete = new EventEmitter();
    }
}
