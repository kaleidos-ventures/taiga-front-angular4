import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-taskboard-header",
    template: require("./taskboard-header.pug"),
})
export class TaskboardHeader {
    @Input() project: Immutable.Map<string, any>;
}
