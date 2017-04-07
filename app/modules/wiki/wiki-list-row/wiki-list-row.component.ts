import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import * as Immutable from "immutable";

@Component({
    host: {class: "row table-main"},
    selector: "tg-wiki-list-row",
    template: require("./wiki-list-row.pug"),
})
export class WikiListRow {
    @Input() project: Immutable.Map<string, any>;
    @Input() page: Immutable.List<any>;

    constructor() {}
}
