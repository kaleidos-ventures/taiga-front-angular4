import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import {OpenLightboxAction, CloseLightboxAction} from "../../../app.actions";
import * as actions from "../wiki.actions";
import * as Immutable from "immutable";

@Component({
    selector: "tg-wiki-nav",
    template: require("./wiki-nav.pug"),
})
export class WikiNav {
    @Input() project: Immutable.Map<string, any>;
    @Input() links: Immutable.List<any>;
    linkToDelete: Immutable.Map<string, any>;
    adding: boolean = false;

    constructor(private store: Store<IState>) {}

    deleteLink(link) {
        this.linkToDelete = link;
        this.store.dispatch(new OpenLightboxAction("wiki.link-delete-confirm"));
    }

    onDeleteLink(accepted) {
        if (accepted) {
            this.store.dispatch(new actions.DeleteWikiLinkAction(this.linkToDelete.get('id')));
        }
        this.store.dispatch(new CloseLightboxAction());
        this.linkToDelete = null;
    }

    keyupNewLink(event, value) {
        if (event.keyCode == 13) {
            this.store.dispatch(new actions.CreateWikiLinkAction(this.project.get('id'), value));
            this.adding = false;
        } else if (event.keyCode == 27) {
            this.adding = false;
        }
    }
}
