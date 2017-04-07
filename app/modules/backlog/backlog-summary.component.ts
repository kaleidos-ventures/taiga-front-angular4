import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-backlog-summary",
    template: require("./backlog-summary.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogSummary {
    @Input() project: Immutable.Map<string, any>;
    @Input() stats: Immutable.Map<string, any>;
    graphOpen: boolean = false;

    completedPercentage() {
        const definedPoints = this.stats.get('defined_points');
        const totalPoints = this.stats.get('total_points') ? this.stats.get('total_points') : definedPoints;
        if (totalPoints) {
            return Math.round((100 * this.stats.get('closed_points')) / totalPoints);
        }
        return 0;
    }

    showGraphPlaceholder() {
        return this.project && this.stats && (!this.stats.get('total_points') || !this.stats.get('total_milestones')) && this.project.get('i_am_admin')
    }

    showGraph() {
        return this.stats && this.stats.get('total_points') && this.stats.get('total_milestones')
    }
}
