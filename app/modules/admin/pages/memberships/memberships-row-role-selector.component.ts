import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-memberships-row-role-selector",
    template: `<select>
                    <option *ngFor="let role of roles" [value]="role.get('id')" [selected]="member.get('role') === role.get('id')">
                        {{ role.get('name') }}
                    </option>
               </select>`,
})
export class AdminMembershipsRowRoleSelector {
    @Input() member: Immutable.Map<string, any>;
    @Input() roles: Immutable.List<any>;
}
