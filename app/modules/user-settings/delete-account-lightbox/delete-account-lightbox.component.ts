import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "lightbox-delete-account"},
    selector: "tg-delete-account-lightbox",
    template: require("./delete-account-lightbox.pug"),
})
export class DeleteAccountLightbox {
    @Input() user: Immutable.Map<string, any>;
    @Output() response: EventEmitter<number>;

    constructor() {
        this.response = new EventEmitter();
    }
}
