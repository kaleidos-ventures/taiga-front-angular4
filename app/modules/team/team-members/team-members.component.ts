import {Component, Input, OnInit, OnChanges} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-team-members",
    template: require("./team-members.pug"),
})
export class TeamMembers implements OnInit, OnChanges {
    @Input() memberships: Immutable.List<Immutable.Map<string, any>>;
    filtered_memberships: Immutable.List<Immutable.Map<string, any>>;
    @Input() project: Immutable.Map<string, any>;
    @Input() stats: Immutable.Map<string, any>;
    @Input() filtersQ: string;
    @Input() filtersRole: Immutable.Map<string, any>;

    ngOnInit() {
        this.filtered_memberships = this.memberships;
    }

    ngOnChanges(changes) {
        if (this.memberships) {
            this.filtered_memberships = this.memberships
                                   .filter((member) => {
                                       if (this.filtersQ) {
                                           return member.get('full_name').search(new RegExp(this.filtersQ, "i")) >= 0
                                       }
                                       return true;
                                   })
                                   .filter((member) => {
                                       if (this.filtersRole) {
                                           return member.get('role') === this.filtersRole.get('id')
                                       }
                                       return true;
                                   }).toList();
        }
    }
}
