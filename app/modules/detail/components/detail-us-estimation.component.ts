import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    selector: "tg-detail-us-estimation",
    template: require("./detail-us-estimation.pug"),
})
export class DetailUsEstimation {
    @Input() item: Immutable.Map<string,any>;
    @Input() roles: Immutable.List<any>;
    @Input() points: Immutable.List<any>;
    @Input() canEdit: boolean;
    open: number = null;

    rolePoints(role: Immutable.Map<string, any>) {
        if (this.item && this.points && role) {
            let pointsId = this.item.getIn(["points", role.get('id').toString()]);
            if (!pointsId) {
                return "";
            }
            let points = this.points.filter((p) => p.get('id') == pointsId).get(0);
            return points.get('name');
        }
        return "";
    }

    toggleRole(roleId) {
        if (this.open == roleId) {
            this.open = null;
        } else {
            this.open = roleId;
        }
    }

    computableRoles() {
        return this.roles.filter((r) => r.get('computable'));
    }

    totalPoints() {
        if (this.item) {
            return _.sum(
                this.item.get("points")
                         .valueSeq()
                         .map((x) => this.points.getIn([x, 'value']))
                         .toJS()
            );
        }
        return 0;
    }
}
