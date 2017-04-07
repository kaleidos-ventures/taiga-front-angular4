import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-attachments-header",
    template: require("./attachments-header.pug"),
})
export class AttachmentsHeader {
    @Input() attachments: Immutable.List<any>;
    @Input() mode: string;
    @Output() changeMode: EventEmitter<string>;

    constructor() {
        this.changeMode = new EventEmitter();
    }
}
