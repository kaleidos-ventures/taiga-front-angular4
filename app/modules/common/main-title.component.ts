import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
    selector: "tg-main-title",
    template: require("./main-title.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTitle {
    @Input() sectionName;
    @Input() subsectionName;
    @Input() project;
}
