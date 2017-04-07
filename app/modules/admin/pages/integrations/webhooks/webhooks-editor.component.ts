import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-integrations-webhooks-editor",
    template: require("./webhooks-editor.pug"),
})
export class AdminIntegrationsWebhooksEditor {
    @Input() webhooks: Immutable.List<any>;
}
