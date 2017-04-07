import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "member-stats"},
    selector: "tg-taskboard-member-stats",
    template: require("./taskboard-member-stats.pug"),
})
export class TaskboardMemberStats {
    @Input() stats: Immutable.Map<string, any>
    @Input() project: Immutable.Map<string, any>
    @Input() userId: number;
}
