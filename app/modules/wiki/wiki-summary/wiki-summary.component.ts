import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import * as Immutable from "immutable";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import {CloseLightboxAction, OpenLightboxAction} from "../../../app.actions";

@Component({
    selector: "tg-wiki-summary",
    template: require("./wiki-summary.pug"),
})
export class WikiSummary {
    @Input() page: Immutable.Map<string, any>;
    @Input() project: Immutable.Map<string, any>;
    @Output() delete: EventEmitter<any>;

    constructor(private store: Store<IState>) {
        this.delete = new EventEmitter();
    }

    onDeleteClicked() {
        this.store.dispatch(new OpenLightboxAction("wiki.delete-confirm"));
    }

    onResponse(response) {
        if (response === true) {
            this.delete.emit({projectSlug: this.project.get('slug'), wikiPageId: this.page.get('id')});
        }
        this.store.dispatch(new CloseLightboxAction());
    }
}
