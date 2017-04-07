import {ChangeDetectionStrategy, Component, Input, ElementRef, OnChanges} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import * as Immutable from "immutable";
import * as _ from "lodash";
import * as moment from "moment";

@Component({
    selector: "tg-taskboard-graph",
    template: `<div class="graph"></div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskboardGraph implements OnChanges {
    @Input() stats: Immutable.Map<string, any>;

    constructor(private element: ElementRef, private translate: TranslateService) {}

    ngOnChanges() {
        if (!this.stats) {
            return
        }

        let dataToDraw = this.stats.get('days').toJS();
        let element = $(this.element.nativeElement).find('.graph');
        element.height(240)

        let days = _.map(dataToDraw, (x:any) => moment(new Date(x.day).getTime()))

        let data = []
        data.unshift({
            data: _.zip(days, _.map(dataToDraw, (d:any) => d.optimal_points)),
            lines: {
                fillColor : "rgba(120,120,120,0.2)"
            }
        })
        data.unshift({
            data: _.zip(days, _.map(dataToDraw, (d:any) => d.open_points)),
            lines: {
                fillColor : "rgba(102,153,51,0.3)"
            }
        })

        const options = {
            grid: {
                borderWidth: { top: 0, right: 1, left:0, bottom: 0 },
                borderColor: '#ccc',
                hoverable: true,
            },
            xaxis: {
                tickSize: [1, "day"],
                min: days[0],
                max: _.last(days),
                mode: "time",
                daysNames: days,
                axisLabel: this.translate.instant("TASKBOARD.CHARTS.XAXIS_LABEL"),
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5,
            },
            yaxis: {
                min: 0,
                axisLabel: this.translate.instant("TASKBOARD.CHARTS.YAXIS_LABEL"),
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
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
                }
            },
            colors: ["rgba(102,153,51,1)", "rgba(120,120,120,0.2)"],
            tooltip: true,
            tooltipOpts: {
                content: (label, xval, yval, flotItem) => {
                    let formattedDate = moment(xval).format(this.translate.instant("TASKBOARD.CHARTS.DATE"))
                    let roundedValue = Math.round(yval)

                    if (flotItem.seriesIndex == 1) {
                        return this.translate.instant("TASKBOARD.CHARTS.OPTIMAL", {
                            formattedDate: formattedDate,
                            roundedValue: roundedValue
                        })
                    } else {
                        return this.translate.instant("TASKBOARD.CHARTS.REAL", {
                            formattedDate: formattedDate,
                            roundedValue: roundedValue
                        })
                    }
                }
            }
        }

        element.empty();
        return (<any>element).plot(data, options).data("plot");
    }
};
