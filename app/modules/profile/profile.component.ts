import {Component, OnInit, OnDestroy} from "@angular/core";
import * as Immutable from "immutable";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import {Observable, Subscription} from "rxjs";
import * as actions from "./profile.actions";

@Component({
    template: require("./profile.pug"),
})
export class ProfilePage implements OnInit, OnDestroy {
    user: Observable<Immutable.Map<string,any>>;
    stats: Observable<Immutable.Map<string,any>>;
    contacts: Observable<Immutable.List<any>>;
    projects: Observable<Immutable.List<any>>;
    items: Observable<Immutable.List<any>>;
    timeline: Observable<Immutable.List<any>>;
    myUser: Observable<Immutable.Map<string,any>>;
    isCurrentUser: boolean = false;
    subscriptions: Subscription[];

    constructor(private store: Store<IState>, private route: ActivatedRoute) {
        this.myUser = this.store.select((state) => state.getIn(['auth', 'user']));
        this.user = this.store.select((state) => state.getIn(['profile', 'user']));
        this.stats = this.store.select((state) => state.getIn(['profile', 'stats']));
        this.contacts = this.store.select((state) => state.getIn(['profile', 'contacts']));
        this.projects = this.store.select((state) => state.getIn(['profile', 'projects']));
        this.items = this.store.select((state) => state.getIn(['profile', 'items']));
        this.timeline = this.store.select((state) => state.getIn(['profile', 'timeline']));
    }

    ngOnInit() {
        this.subscriptions = [
            Observable.combineLatest(this.route.params, this.myUser).subscribe(([params, myUser]) => {
                if (params.username) {
                    this.store.dispatch(new actions.FetchUserProfileAction(params.username));
                } else {
                    this.store.dispatch(new actions.SetUserProfileAction(myUser));
                }
            }),
            Observable.combineLatest(this.myUser, this.user).subscribe(([myUser, user]:any) => {
                if (myUser && user) {
                    this.isCurrentUser = myUser.get('id') == user.get('id');
                }
            }),
            this.user.subscribe((user) => {
                if (user) {
                    this.store.dispatch(new actions.FetchUserStatsAction(user.get('id')));
                }
            })
        ]
    }

    ngOnDestroy() {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
}
