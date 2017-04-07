import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-team-current-user",
    template: require("./team-current-user.pug"),
})
export class TeamCurrentUser {
    @Input() user: Immutable.Map<string, any>;
    @Input() project: Immutable.Map<string, any>;
    @Input() stats: Immutable.Map<string, any>;

    get_role_name() {
        if (!this.user || !this.project) {
            return "";
        }

        let userId = this.user.get('id');
        let user = this.project.get('members').filter((user) => user.get('id') === userId).first()
        if (user) {
            return user.get('role_name');
        } else {
            return ""
        }
    }
}
