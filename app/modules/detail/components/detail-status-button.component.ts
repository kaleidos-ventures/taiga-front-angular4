import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-status-button",
    template: require("./detail-status-button.pug"),
})
export class DetailStatusButton {
    @Input() status: Immutable.Map<string,any>;
    @Input() statuses: Immutable.List<any>;
    @Input() canEdit: boolean;
    openedMenu: boolean = false;

    openMenu() {
        if (this.canEdit) {
            this.openedMenu = !this.openedMenu;
        }
    }
}
