import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-vote-button",
    template: require("./detail-vote-button.pug"),
})
export class DetailVoteButton {
    @Input() user: Immutable.Map<string,any>;
    @Input() item: Immutable.Map<string,any>;
}
