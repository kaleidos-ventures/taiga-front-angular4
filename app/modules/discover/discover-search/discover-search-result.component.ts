import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-discover-search-result",
    template: require("./discover-search-result.pug"),
})
export class DiscoverSearchResult {
    @Input() project: Immutable.Map<string,any>;
}
