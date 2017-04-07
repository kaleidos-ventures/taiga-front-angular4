import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-team-filters",
    template: require("./team-filters.pug"),
})
export class TeamFilters {
    @Input() project: Immutable.Map<string, any>;
    @Input() role: number;
    @Output() roleChange: EventEmitter<number>;
    @Input() query: string;
    @Output() queryChange: EventEmitter<string>;

    constructor() {
        this.roleChange = new EventEmitter();
        this.queryChange = new EventEmitter();
    }

    setRole(role) {
        this.role = role;
        this.roleChange.emit(this.role);
    }

    setQ(value) {
        this.query = value;
        this.queryChange.emit(value);
    }
}
