import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-edit-role",
    template: require("./permissions-edit-role.pug"),
})
export class AdminEditRole {
    @Input() role: Immutable.Map<string, any>;
    @Input() project: Immutable.Map<string, any>;
    @Input() noEstimableRoles: boolean;
}
