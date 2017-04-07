import {Component, Input, OnChanges} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-issues-bullet",
    template: `<div class="level"
                    [style.background-color]="_types.getIn([typeId, 'color'])"
                    [title]="_types.getIn([typeId, 'name'])">
               </div>`
})
export class IssuesBullet implements OnChanges {
    @Input() types: Immutable.List<any>;
    @Input() typeId: string;
    _types: Immutable.Map<any, any>;

    ngOnChanges() {
        this._types = Immutable.Map(this.types.map((x) => [x.get('id'), x]));
    }
}
