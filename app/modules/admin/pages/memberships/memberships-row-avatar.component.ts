import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-memberships-row-avatar",
    template: require("./memberships-row-avatar.pug"),
})
export class AdminMembershipsRowAvatar {
    @Input() member: Immutable.Map<string, any>
}
