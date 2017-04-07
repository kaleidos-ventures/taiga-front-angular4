import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-profile-favs-item-ticket",
    template: require("./profile-favs-item-ticket.pug"),
})
export class ProfileFavsItemTicket {
    @Input() item: Immutable.Map<string,any>;
}
