import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-related-tasks",
    template: require("./detail-related-tasks.pug"),
})
export class DetailRelatedTasks {
    @Input() tasks: Immutable.Map<string,any>;

    // TODO: Show related tasks
    showRelatedTasks() {
        return true
    }
}
