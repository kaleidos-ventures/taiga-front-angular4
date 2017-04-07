import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import * as Immutable from "immutable";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import * as actions from "../profile.actions";

@Component({
    selector: "tg-profile-contacts",
    template: require("./profile-contacts.pug"),
})
export class ProfileContacts implements OnInit, OnDestroy {
    @Input() user: Immutable.Map<string, any>;
    @Input() contacts: Immutable.List<any>;
    @Input() isCurrentUser: boolean;
    subscription: Subscription;

    constructor(private store: Store<IState>) {
    }

    ngOnInit() {
        this.store.dispatch(new actions.FetchProfileContactsAction(this.user.get('id')));
    }

    ngOnDestroy() {
        this.store.dispatch(new actions.SetProfileContactsAction(null));
    }
}
