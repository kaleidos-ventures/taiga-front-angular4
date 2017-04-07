import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-profile-favs-filter",
    template: require("./profile-favs-filter.pug"),
})
export class ProfileFavsFilter {
    @Input() q: string;
    @Output() qChange: EventEmitter<string>;
    @Input() filter: string;
    @Output() filterChange: EventEmitter<string>;
    @Input() type: string;

    constructor() {
        this.qChange = new EventEmitter();
        this.filterChange = new EventEmitter();
    }
}
