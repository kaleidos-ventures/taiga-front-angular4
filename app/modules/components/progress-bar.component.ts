import {Component, Input} from "@angular/core";

@Component({
    selector: "tg-progress-bar",
    template: `<div class="current-progress" [style.width]="percentage + '%'"></div>`,
})
export class ProgressBar {
    @Input() percentage: number;
}
