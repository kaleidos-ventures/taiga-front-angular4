import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-memberships-row-actions",
    template: `
        <div class="active"
             translate="ADMIN.MEMBERSHIP.STATUS_ACTIVE"
             *ngIf="member.get('is_user_active')">
        </div>
        <a class="resend js-resend" href=""
           [title]="'ADMIN.MEMBERSHIP.RESEND' | translate"
           translate="ADMIN.MEMBERSHIP.RESEND"
           *ngIf="!member.get('is_user_active')">
        </a>
        <a class="delete" href=""
           [title]="'ADMIN.MEMBERSHIP.DELETE_MEMBER' | translate">
            <tg-svg svg-icon="icon-trash"></tg-svg>
        </a>`,
})
export class AdminMembershipsRowActions {
    @Input() member: Immutable.Map<string, any>;
}

