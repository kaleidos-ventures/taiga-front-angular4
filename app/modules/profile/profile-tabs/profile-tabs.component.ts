import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-profile-tabs",
    template: require("./profile-tabs.pug"),
})
export class ProfileTabs {
    @Input() contacts: Immutable.List<any>;
    @Input() projects: Immutable.List<any>;
    @Input() items: Immutable.List<any>;
    @Input() timeline: Immutable.List<any>;
    @Input() user: Immutable.Map<string, any>;
    @Input() isCurrentUser: boolean;

    activeTab: string = "timeline";
}
