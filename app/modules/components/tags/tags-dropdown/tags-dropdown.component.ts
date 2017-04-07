import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-tags-dropdown",
    template: require("./tags-dropdown.pug"),
})
export class TagsDropdown {
    @Input() tag: any;
    @Input() colorArray: Immutable.List<any>;
}
