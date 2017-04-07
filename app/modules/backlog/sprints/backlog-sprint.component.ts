import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "sprint"},
    selector: "tg-backlog-sprint",
    template: require('./backlog-sprint.pug'),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogSprint {
    @Input() project: Immutable.Map<string, any>;
    @Input() sprint: Immutable.Map<string, any>;
    compactSprint: boolean = false;
}
