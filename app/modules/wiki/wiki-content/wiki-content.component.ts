import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import * as actions from "../wiki.actions";
import * as Immutable from "immutable";

@Component({
    selector: "tg-wiki-content",
    template: require("./wiki-content.pug"),
})
export class WikiContent {
    @Input() project: Immutable.Map<string, any>;
    @Input() page: Immutable.Map<string, any>;

    constructor(private store: Store<IState>) {}
}
