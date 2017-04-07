import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-integrations-webhooks-row",
    template: require("./webhooks-row.pug"),
})
export class AdminIntegrationsWebhooksRow {
    @Input() webhook: Immutable.Map<string, any>;
}
