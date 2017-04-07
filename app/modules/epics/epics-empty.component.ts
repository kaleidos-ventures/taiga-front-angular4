import { Component, Input } from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-epics-empty",
    template: require("./epics-empty.pug"),
})
export class EpicsEmpty {
    @Input() epics: Immutable.List<any>;
}
