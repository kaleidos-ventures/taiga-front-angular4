import {Component, Input, OnChanges} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "issue-field"},
    selector: "tg-issues-status-inline-edition",
    template: require("./issues-status-inline-edition.pug"),
})
export class IssuesStatusInlineEdition implements OnChanges {
    @Input() statuses: Immutable.List<any>;
    @Input() statusId: string;
    _statuses: Immutable.Map<any, any>;
    showMenu: boolean = false;

    ngOnChanges() {
        this._statuses = Immutable.Map(this.statuses.map((x) => [x.get('id'), x]));
    }
}
