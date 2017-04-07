import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-epics-story-row",
    template: require("./epics-story-row.pug"),
})
export class EpicsStoryRow {
    @Input() story: Immutable.Map<string, any>;
    @Input() columns: any;

    percentage() {
        if (this.story.get('is_closed')) {
            return 100;
        } else {
            let tasks = this.story.get('tasks').reduce((acc, t) => {
                if (t.get('is_closed')) {
                    acc.closed++;
                } else {
                    acc.opened++;
                }
                return acc
            }, {opened: 0, closed: 0});

            if (tasks.opened == 0 && tasks.closed == 0) {
                return 0;
            }
            return (100 * tasks.closed) / (tasks.opened + tasks.closed);
        }
    }
}
