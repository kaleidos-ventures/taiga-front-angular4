import {Component, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import {Observable, Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import * as Immutable from "immutable"
import * as actions from "../../admin.actions";

@Component({
    template: require("./memberships.pug"),
})
export class AdminMembershipsPage implements OnDestroy {
    project: Observable<Immutable.Map<string, any>>;
    memberships: Observable<Immutable.List<any>>;
    subscriptions: Subscription[]

    constructor(private store: Store<IState>) {
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']));
        this.memberships = this.store.select((state) => state.getIn(['admin', 'memberships']));

        this.subscriptions = [
            this.project.subscribe((project) => {
                if (project) {
                    this.store.dispatch(new actions.FetchAdminMembershipsAction(project.get('id')));
                }
            })
        ]
    }

    ngOnDestroy() {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe()
        }
    }
}
