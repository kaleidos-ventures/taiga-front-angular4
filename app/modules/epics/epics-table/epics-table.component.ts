import { Component, Input } from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-epics-table",
    template: require("./epics-table.pug"),
})
export class EpicsTable {
    @Input() epics: Immutable.List<any>;
    @Input() userStories: Immutable.Map<string, any>;
    @Input() project: Immutable.Map<string, any>;
    columns: any;
    displayOptions: boolean = false;

    constructor() {
        this.columns = {
            votes: true,
            project: true,
            sprint: true,
            assigned: true,
            status: true,
            progress: true,
        }
    }
}
