import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-related-task-row",
    template: require("./detail-related-task-row.pug"),
})
export class DetailRelatedTaskRow {
    @Input() task: Immutable.Map<string,any>;
    test() {
        console.log(this.task.toJS());
    }
}
