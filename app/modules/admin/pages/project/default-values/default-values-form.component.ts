import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-default-values-form",
    template: require("./default-values-form.pug"),
})
export class AdminDefaultValuesForm {
    @Input() project: Immutable.Map<string, any>;
}
