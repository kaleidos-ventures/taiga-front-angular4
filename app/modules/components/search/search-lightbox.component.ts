import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import { GoAction } from "../../../router.actions";
import { CloseLightboxAction } from "../../../app.actions";
import * as Immutable from "immutable";


@Component({
    selector: "tg-search-lightbox",
    template: require("./search-lightbox.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLightbox {
    @Input() project: string;
    text: string = "";

    constructor(private store: Store<IState>) {}

    submit(event) {
        event.preventDefault();
        if (!this.project) {
            return false
        }
        this.store.dispatch(new GoAction(["/project", this.project, "search"], {text: this.text}));
        this.store.dispatch(new CloseLightboxAction());
    }
}
