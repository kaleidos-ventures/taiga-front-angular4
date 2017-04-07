import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-status-display",
    template: `
        <span translate="COMMON.STATUS.CLOSED" *ngIf="item.get('is_closed')"></span>
        <span translate="COMMON.STATUS.OPEN" *ngIf="!item.get('is_closed')"></span>
    `,
})
export class DetailStatusDisplay {
    @Input() item: Immutable.Map<string,any>;
}


