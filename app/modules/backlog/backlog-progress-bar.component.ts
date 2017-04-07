import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    host: {"class": "summary-progress-bar"},
    selector: "tg-backlog-progress-bar",
    template: require("./backlog-progress-bar.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogProgressBar {
    @Input() stats: Immutable.Map<string, any>;

    projectPointsPercentaje() {
        let result;
        const definedPoints = this.stats.get('defined_points');
        const totalPoints = this.stats.get('total_points') ? this.stats.get('total_points') : definedPoints;
        const closedPoints = this.stats.get('closed_points');
        if (definedPoints > totalPoints) {
            result = (totalPoints * 100) / definedPoints;
        } else {
            result = 100;
        }
        return this.adjustPercentaje(result - 3);
    }

    closedPointsPercentaje() {
        let result;
        const definedPoints = this.stats.get('defined_points');
        const totalPoints = this.stats.get('total_points') ? this.stats.get('total_points') : definedPoints;
        const closedPoints = this.stats.get('closed_points');
        if (definedPoints > totalPoints) {
            result = (closedPoints * 100) / definedPoints;
        } else {
            result = (closedPoints * 100) / totalPoints;
        }
        return this.adjustPercentaje(result - 3);
    }

    adjustPercentaje(percentage) {
        let adjusted = _.max([0 , percentage]);
        adjusted = _.min([100, adjusted]);
        return Math.round(adjusted);
    }
}
