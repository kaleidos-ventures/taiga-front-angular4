import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-create-project-form-privacy",
    template: require("./create-project-form-privacy.pug"),
})
export class CreateProjectFormPrivacy {
    @Input() form: any;
}
