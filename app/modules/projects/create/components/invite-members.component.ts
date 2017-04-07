import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-invite-members",
    template: require("./invite-members.pug"),
})
export class InviteMembers {
    @Input() members: Immutable.List<any>;
    @Input() invitedMembers: any;
    @Output() onToggleInvitedMember: EventEmitter<number>;

    constructor() {
        this.onToggleInvitedMember = new EventEmitter();
    }

    isDisabled(id) {
        return !this.invitedMembers[id];
    }
}
