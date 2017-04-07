import {Component, Input, OnInit, OnDestroy, OnChanges} from "@angular/core";
import Debounce from 'debounce-decorator'
import * as Immutable from "immutable";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import * as actions from "../profile.actions";

@Component({
    selector: "tg-profile-favs",
    template: require("./profile-favs.pug"),
})
export class ProfileFavs implements OnInit, OnDestroy {
    @Input() user: Immutable.Map<string,any>;
    @Input() items: Immutable.List<any>;
    @Input() type: string;
    q: string = "";
    filter: string = null;
    page: number = 1;

    constructor(private store: Store<IState>) {}

    ngOnInit() {
        this.store.dispatch(new actions.FetchProfileItemsAction(this.user.get('id'), this.type, this.q, this.filter, this.page));
    }

    @Debounce(250)
    setQ(q) {
        this.q = q;
        this.store.dispatch(new actions.SetProfileItemsAction(null));
        this.store.dispatch(new actions.FetchProfileItemsAction(this.user.get('id'), this.type, this.q, this.filter, this.page));
    }

    setFilter(filter) {
        this.filter = filter;
        this.store.dispatch(new actions.SetProfileItemsAction(null));
        this.store.dispatch(new actions.FetchProfileItemsAction(this.user.get('id'), this.type, this.q, this.filter, this.page));
    }

    ngOnDestroy() {
        this.store.dispatch(new actions.SetProfileItemsAction(null));
    }
}
