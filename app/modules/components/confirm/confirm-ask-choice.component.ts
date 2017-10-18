import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {class: "lightbox-ask-choice"},
    selector: "tg-confirm-ask-choice",
    template: require("./confirm-ask-choice.pug")
})
export class ConfirmAskChoice {
    @Input() title: string = "";
    @Input() subtitle: string = "";
    @Input() message: string = "";
    @Input() options: Immutable.List<any>;
    @Input() loading: string = "";
    @Input() replacementMessage: string = "";
    @Input() warningMessage: string = "";
    @Output() response: EventEmitter<number>;

    constructor() {
        this.response = new EventEmitter();
    }
}

