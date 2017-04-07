import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-profile-favs-item-project",
    template: require("./profile-favs-item-project.pug"),
})
export class ProfileFavsItemProject {
    @Input() item: Immutable.Map<string,any>;
}
