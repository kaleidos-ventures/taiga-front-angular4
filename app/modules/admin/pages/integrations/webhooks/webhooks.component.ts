import {Component, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import {Observable, Subscription} from "rxjs";
import * as actions from "../../../admin.actions";
import {TranslateService} from "@ngx-translate/core";
import * as Immutable from "immutable"

@Component({
    template: require("./webhooks.pug"),
})
export class AdminIntegrationsWebhooksPage {
    project: Observable<Immutable.Map<string, any>>;
    projectId: number;
    webhooks: Observable<Immutable.List<any>>;
    webhooksLogs: Observable<Immutable.List<any>>;
    editing: Observable<Immutable.Map<number, boolean>>;
    adding: Observable<boolean>;

    constructor(private store: Store<IState>, private translate: TranslateService) {
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']))
        this.webhooks = this.store.select((state) => state.getIn(['admin', 'webhooks']))
        this.webhooksLogs = this.store.select((state) => state.getIn(['admin', 'webhooks-logs']))
        this.editing = this.store.select((state) => state.getIn(['admin', 'webhooks-editing']))
        this.adding = this.store.select((state) => state.getIn(['admin', 'webhooks-adding']))
        this.project.subscribe((project) => {
            if (project) {
                this.store.dispatch(new actions.FetchAdminWebhooksAction(project.get('id')));
                this.projectId = project.get('id');
            }
        })
    }

    onSaveWebhook(data) {
        data.project = this.projectId;
        if (data.id) {
            this.store.dispatch(new actions.UpdateWebhookAction(this.projectId, data.id, data));
        } else {
            this.store.dispatch(new actions.CreateWebhookAction(this.projectId, data));
        }
    }

    onAddClicked() {
        this.store.dispatch(new actions.SetWebhookAddingAction(true));
    }
}
