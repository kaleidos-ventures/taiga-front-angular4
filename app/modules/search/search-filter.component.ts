import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-search-filter",
    template: require("./search-filter.pug"),
})
export class SearchFilter {
    @Input() results: Immutable.List<any>;
    @Input() activeTab: string;
    @Output() activeTabChange: EventEmitter<string>;

    constructor() {
        this.activeTabChange = new EventEmitter()
    }
}
