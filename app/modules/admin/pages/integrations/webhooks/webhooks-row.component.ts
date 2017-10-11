import {Component, Input} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import {OpenLightboxAction, CloseLightboxAction} from "../../../../../app.actions";
import * as Immutable from "immutable";
import * as actions from "../../../admin.actions";
import * as moment from "moment";

@Component({
    selector: "tg-admin-integrations-webhooks-row",
    template: require("./webhooks-row.pug"),
})
export class AdminIntegrationsWebhooksRow {
    @Input() webhook: Immutable.Map<string, any>;
    @Input() webhookLog: Immutable.List<any>;
    detailOpen: any = {};

    constructor(private store: Store<IState>, private translate: TranslateService) {
        this.enrichLog = this.enrichLog.bind(this)
        this.detailOpen = {};
    }

    enrichLog(log) {
        let prettyDate = this.translate.instant("ADMIN.WEBHOOKS.DATE")
        let newLog = log.set('validStatus', log.get('status') >= 200 && log.get('status') < 300);
        newLog = newLog.set(
            'prettySentHeaders',
            log.get('request_headers').entrySeq().map(
                ([header, value]) => `${header}: ${value}`
            ).join("\n")
        );
        newLog = newLog.set('prettySentData', JSON.stringify(log.get('request_data')));
        newLog = newLog.set('prettyDate', moment(log.get('created')).format(prettyDate));
        return newLog
    }
    onEdit() {
        this.store.dispatch(new actions.SetWebhookEditAction(this.webhook.get('id'), true));
    }

    onTest() {
        this.store.dispatch(new actions.TestWebhookAction(this.webhook.get('project'), this.webhook.get('id')));
    }

    onDelete() {
        this.store.dispatch(new OpenLightboxAction(`webhook.delete-confirm-${this.webhook.get('id')}`));
    }

    onDeleteConfirm(response) {
        if (response) {
            this.store.dispatch(new actions.DeleteWebhookAction(this.webhook.get('project'), this.webhook.get('id')));
        } else {
            this.store.dispatch(new CloseLightboxAction());
        }
    }

    showHistory() {
        this.store.dispatch(new actions.FetchWebhookLogAction(this.webhook.get('id')));
    }

    hideHistory() {
        this.store.dispatch(new actions.SetWebhookLogAction(this.webhook.get('id'), null));
    }
}
