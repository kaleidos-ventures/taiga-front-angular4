import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-create-project-form-actions",
    template: require("./create-project-form-actions.pug"),
})
export class CreateProjectFormActions {
    @Input() form: any;
    @Output() cancel: EventEmitter<boolean>;

    constructor() {
        this.cancel = new EventEmitter();
    }
}
