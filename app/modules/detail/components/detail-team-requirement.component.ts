import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-team-requirement",
    template: require("./detail-team-requirement.pug"),
})
export class DetailTeamRequirement {
    @Input() item: Immutable.Map<string,any>;
    @Input() canEdit: boolean;
}
