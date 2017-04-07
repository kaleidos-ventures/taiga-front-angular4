import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-taskboard-sprint-summary",
    template: require("./taskboard-sprint-summary.pug"),
})
export class TaskboardSprintSummary {
    @Input() stats: Immutable.Map<string,any>;
    @Input() rolePoints: Immutable.List<any>;
    @Input() showGraph: boolean;
    @Output() showGraphChange: EventEmitter<boolean>;

    constructor() {
        this.showGraphChange = new EventEmitter();
    }
}
