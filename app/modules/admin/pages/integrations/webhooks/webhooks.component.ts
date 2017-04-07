import {Component, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import {Observable, Subscription} from "rxjs";
import {FetchAdminWebhooksAction} from "../../../admin.actions";
import {TranslateService} from "@ngx-translate/core";
import * as Immutable from "immutable"

@Component({
    template: require("./webhooks.pug"),
})
export class AdminIntegrationsWebhooksPage {
    project: Observable<Immutable.Map<string, any>>;
    webhooks: Observable<Immutable.List<any>>;

    constructor(private store: Store<IState>, private translate: TranslateService) {
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']))
        this.webhooks = this.store.select((state) => state.getIn(['admin', 'webhooks']))
        this.project.subscribe((project) => {
            if (project) {
                this.store.dispatch(new FetchAdminWebhooksAction(project.get('id')));
            }
        })
    }
}
