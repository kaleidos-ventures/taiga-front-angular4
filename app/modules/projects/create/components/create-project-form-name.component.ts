import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-create-project-form-name",
    template: require("./create-project-form-name.pug"),
})
export class CreateProjectFormName {
    @Input() form: any;
}
