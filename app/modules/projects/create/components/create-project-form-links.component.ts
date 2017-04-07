import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-create-project-form-links",
    template: require("./create-project-form-links.pug"),
})
export class CreateProjectFormLinks {
    @Input() formControlName: any;
    @Input() control: any;
}
