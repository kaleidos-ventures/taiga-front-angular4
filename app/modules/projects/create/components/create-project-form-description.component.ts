import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-create-project-form-description",
    template: require("./create-project-form-description.pug"),
})
export class CreateProjectFormDescription {
    @Input() form: any;
}
