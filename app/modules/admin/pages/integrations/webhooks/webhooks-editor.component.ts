import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-integrations-webhooks-editor",
    template: require("./webhooks-editor.pug"),
})
export class AdminIntegrationsWebhooksEditor {
    @Input() webhooks: Immutable.List<any>;
    @Input() editing: Immutable.Map<number, boolean>;
    @Input() webhooksLogs: Immutable.Map<number, any>;
    @Input() adding: boolean;
    @Output() save: EventEmitter<any>;
    show: any = {};

    constructor() {
        this.save = new EventEmitter();
    }
}
