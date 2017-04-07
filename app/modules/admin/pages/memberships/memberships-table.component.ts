import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-memberships-table",
    template: require("./memberships-table.pug"),
})
export class AdminMembershipsTable {
    @Input() memberships: Immutable.List<any>;
    @Input() project: Immutable.Map<string, any>;
}
