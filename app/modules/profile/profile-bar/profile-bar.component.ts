import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-profile-bar",
    template: require("./profile-bar.pug"),
})
export class ProfileBar {
    @Input() user: Immutable.Map<string,any>;
    @Input() stats: Immutable.Map<string,any>;
    @Input() isCurrentUser: boolean;
}
