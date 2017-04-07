import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "member-stats"},
    selector: "tg-team-member-stats",
    template: require("./team-member-stats.pug"),
})
export class TeamMemberStats {
    @Input() stats: Immutable.Map<string, any>
    @Input() project: Immutable.Map<string, any>
    @Input() userId: number;
}
