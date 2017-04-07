import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-modules-form",
    template: require("./modules-form.pug"),
})
export class AdminModulesForm {
    @Input() project: Immutable.Map<string, any>;
}
