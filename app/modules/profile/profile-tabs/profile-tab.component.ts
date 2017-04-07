import {Component, Input, EventEmitter, Output} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-profile-tab",
    template: require("./profile-tab.pug"),
})
export class ProfileTab {
    @Input() title: string;
    @Input() tabId: string;
    @Input() icon: string;
    @Input() name: string;
    @Input() activeTab: string;
    @Output() select: EventEmitter<string>;

    constructor() {
        this.select = new EventEmitter();
    }
}
