import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "menu-tertiary sidebar"},
    selector: "tg-admin-subnav-project",
    template: require("./admin-subnav-project.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSubnavProject {
    @Input() active: string;
    @Input() project: Immutable.Map<string, any>;
}
