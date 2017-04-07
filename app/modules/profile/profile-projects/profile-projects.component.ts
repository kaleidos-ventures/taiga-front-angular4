import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import * as Immutable from "immutable";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import * as actions from "../profile.actions";

@Component({
    selector: "tg-profile-projects",
    template: require("./profile-projects.pug"),
})
export class ProfileProjects implements OnInit, OnDestroy {
    @Input() user: Immutable.Map<string,any>;
    @Input() projects: Immutable.List<any>;
    @Input() contacts: Immutable.List<any>;

    constructor(private store: Store<IState>) {}

    ngOnInit() {
        this.store.dispatch(new actions.FetchProfileProjectsAction(this.user.get('id')));
        this.store.dispatch(new actions.FetchProfileContactsAction(this.user.get('id')));
    }

    ngOnDestroy() {
        this.store.dispatch(new actions.SetProfileProjectsAction(null));
        this.store.dispatch(new actions.SetProfileContactsAction(null));
    }
}
