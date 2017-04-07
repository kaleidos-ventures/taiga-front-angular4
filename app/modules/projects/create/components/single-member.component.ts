import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-single-member",
    template: require("./single-member.pug"),
})
export class SingleMember {
    @Input() user: Immutable.Map<string,any>;
    @Input() disabled: boolean;
}
