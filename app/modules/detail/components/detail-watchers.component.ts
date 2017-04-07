import {Component, Input, OnChanges} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "ticket-watch"},
    selector: "tg-detail-watchers",
    template: require("./detail-watchers.pug"),
})
export class DetailWatchers implements OnChanges {
    @Input() item: Immutable.Map<string, any>;
    @Input() members: Immutable.Map<string, any>;
    @Input() canEdit: boolean;
    @Input() logged: boolean;
    watchers: Immutable.List<any>;

    ngOnChanges() {
        if (this.item) {
            this.watchers = this.item.get('watchers')
                                     .map((id) => this.members.get(id))
                                     .filter((val) => val)
                                     .toList();
        }
    }
}
