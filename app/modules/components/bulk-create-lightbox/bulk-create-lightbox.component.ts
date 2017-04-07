import {Component, EventEmitter, Input, Output} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {class: "lightbox-generic-bulk"},
    selector: "tg-bulk-create-lightbox",
    template: require("./bulk-create-lightbox.pug"),
})
export class BulkCreateLightbox {
    @Output() create: EventEmitter<any>;

    constructor() {
        this.create = new EventEmitter();
    }

    onClick(value) {
        this.create.emit(value)
    }
}
