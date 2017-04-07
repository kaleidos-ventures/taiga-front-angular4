import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-integrations-webhooks-form",
    template: require("./webhooks-form.pug"),
})
export class AdminIntegrationsWebhooksForm {
    @Input() webhook: Immutable.Map<string, any>;
}
