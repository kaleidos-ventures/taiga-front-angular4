import {ChangeDetectionStrategy, Component, Input, ElementRef, OnChanges} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    selector: "tg-backlog-burndown-graph",
    template: `<div class="burndown"></div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BacklogBurndownGraph implements OnChanges {
    @Input() stats: Immutable.Map<string, any>;

    constructor(private element: ElementRef, private translate: TranslateService) {}

    ngOnChanges() {
        let milestones = this.stats.get('milestones')
        if (milestones === null) {
            return
        }
        milestones = milestones.toJS();
        let element = $(this.element.nativeElement).find('.burndown');

        const width = element.width();
        element.height(width / 6);
        const milestonesRange = this._range(0, (milestones.length - 1), true);
        const data = [];
        const zero_line = _.map(milestones, (ml) => 0);
        data.push({
            data: _.zip(milestonesRange, zero_line),
            lines: {
                fillColor : "rgba(0,0,0,0)",
            },
            points: {
                show: false,
            },
        });
        const optimal_line = _.map(milestones, (ml: any) => ml.optimal);
        data.push({
            data: _.zip(milestonesRange, optimal_line),
            lines: {
                fillColor : "rgba(120,120,120,0.2)",
            },
        });
        const evolution_line = _.filter(_.map(milestones, (ml: any) => ml.evolution), (evolution) => evolution != null);
        data.push({
            data: _.zip(milestonesRange, evolution_line),
            lines: {
                fillColor : "rgba(102,153,51,0.3)",
            },
        });
        const client_increment_line = _.map(milestones, (ml: any) => -ml["team-increment"] - ml["client-increment"]);
        data.push({
            data: _.zip(milestonesRange, client_increment_line),
            lines: {
                fillColor : "rgba(255,51,51,0.3)",
            },
        });
        const team_increment_line = _.map(milestones, (ml: any) => -ml["team-increment"]);
        data.push({
            data: _.zip(milestonesRange, team_increment_line),
            lines: {
                fillColor : "rgba(153,51,51,0.3)",
            },
        });
        const colors = [
            "rgba(0,0,0,1)",
            "rgba(120,120,120,0.2)",
            "rgba(102,153,51,1)",
            "rgba(153,51,51,1)",
            "rgba(255,51,51,1)",
        ];

        const options = {
            axisLabels: {
                show: true
            },
            grid: {
                borderWidth: { top: 0, right: 1, left: 0, bottom: 0 },
                borderColor: "#ccc",
                hoverable: true,
            },
            xaxis: {
                ticks: milestones.length,
                axisLabel: this.translate.instant("BACKLOG.CHART.XAXIS_LABEL"),
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: "Verdana, Arial, Helvetica, Tahoma, sans-serif",
                axisLabelPadding: 5,
                tickFormatter(val, axis) { return ""; },
            },
            yaxis: {
                axisLabel: this.translate.instant("BACKLOG.CHART.YAXIS_LABEL"),
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: "Verdana, Arial, Helvetica, Tahoma, sans-serif",
                axisLabelPadding: 5,
            },
            series: {
                shadowSize: 0,
                lines: {
                    show: true,
                    fill: true,
                },
                points: {
                    show: true,
                    fill: true,
                    radius: 4,
                    lineWidth: 2,
                },
            },
            colors,
            tooltip: true,
            tooltipOpts: {
                content: (label, xval, yval, flotItem) => {
                    let ctx = {sprintName: milestones[xval].name, value: Math.abs(yval)};
                    if (flotItem.seriesIndex === 1) {
                        return this.translate.instant("BACKLOG.CHART.OPTIMAL", ctx);
                    } else if (flotItem.seriesIndex === 2) {
                        return this.translate.instant("BACKLOG.CHART.REAL", ctx);
                    } else if (flotItem.seriesIndex === 3) {
                        return this.translate.instant("BACKLOG.CHART.INCREMENT_CLIENT", ctx);
                    } else {
                        return this.translate.instant("BACKLOG.CHART.INCREMENT_TEAM", ctx);
                    }
                },
            },
        };

        element.empty();
        return (<any>element).plot(data, options).data("plot");
    }

    _range(left, right, inclusive) {
      const range = [];
      const ascending = left < right;
      const end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
      }
      return range;
    }
};
