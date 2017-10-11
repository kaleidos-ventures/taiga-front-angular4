import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    host: {class: "lightbox-generic-ask"},
    selector: "tg-confirm-ask",
    template: require("./confirm-ask.pug")
})
export class ConfirmAsk {
    @Input() title: string = "";
    @Input() subtitle: string = "";
    @Input() message: string = "";
    @Input() loading: string = "";
    @Output() response: EventEmitter<boolean>;

    constructor() {
        this.response = new EventEmitter();
    }
}

