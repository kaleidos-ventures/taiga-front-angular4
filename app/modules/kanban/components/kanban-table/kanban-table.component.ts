import {Component, Input, OnChanges} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-kanban-table",
    template: require("./kanban-table.pug"),
})
export class KanbanTable {
    @Input() project: Immutable.Map<string, any>;
    @Input() items: Immutable.List<any>;
    @Input() statuses: Immutable.List<any> = Immutable.List();
    @Input() nested: boolean = false;
    @Input() zoom: any;
    folds: any = {};
    archivedWatched: any = {};
}
