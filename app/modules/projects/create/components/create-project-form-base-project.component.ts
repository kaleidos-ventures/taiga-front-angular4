import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-create-project-form-base-project",
    template: require("./create-project-form-base-project.pug"),
})
export class CreateProjectFormBaseProject {
    @Input() form: any;
    @Input() projects: Immutable.List<any>;
    @Output() projectChange: EventEmitter<number>

    constructor() {
        this.projectChange = new EventEmitter();
    }
}
