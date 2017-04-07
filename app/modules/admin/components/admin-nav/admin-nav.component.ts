import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    host: {"class": "menu-secondary sidebar settings-nav"},
    selector: "tg-admin-nav",
    template: require("./admin-nav.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNav {
    @Input() active: string;
    @Input() project: Immutable.Map<string, any>;
}
