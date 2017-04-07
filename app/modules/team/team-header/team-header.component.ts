import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-team-header",
    template: require("./team-header.pug"),
})
export class TeamHeader {
    @Input() project: Immutable.Map<string, any>;
}
