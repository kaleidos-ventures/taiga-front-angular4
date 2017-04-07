import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-memberships-row-admin-checkbox",
    template: require("./memberships-row-admin-checkbox.pug"),
})
export class AdminMembershipsRowAdminCheckbox {
    @Input() member: Immutable.Map<string, any>
}
