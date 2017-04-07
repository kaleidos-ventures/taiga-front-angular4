import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-mail-notification-policy",
    template: require("./mail-notification-policy.pug"),
})
export class MailNotificationPolicy {
    @Input() policy: Immutable.Map<string, any>;
    @Output() changedLevel: EventEmitter<number>;

    constructor() {
        this.changedLevel = new EventEmitter();
    }
}
