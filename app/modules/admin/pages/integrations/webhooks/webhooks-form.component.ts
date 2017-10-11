import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UniversalValidators } from "ngx-validators";
import {SetWebhookEditAction, SetWebhookAddingAction} from "../../../admin.actions";

@Component({
    selector: "tg-admin-integrations-webhooks-form",
    template: require("./webhooks-form.pug"),
})
export class AdminIntegrationsWebhooksForm {
    @Input() webhook: Immutable.Map<string, any>;
    @Input() hideCancel;
    @Output() save: EventEmitter<any>;
    form: FormGroup;

    constructor(private store: Store<IState>,
                private fb: FormBuilder) {
        this.save = new EventEmitter();
        this.form = this.fb.group({
            id: null,
            name: ["", Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(256),
            ])],
            url: ["", Validators.required],
            key: ["", Validators.required],
        });
    }

    ngOnChanges() {
        if(this.webhook) {
            this.form.controls.id.reset(this.webhook.get('id'));
            this.form.controls.name.reset(this.webhook.get('name'));
            this.form.controls.url.reset(this.webhook.get('url'));
            this.form.controls.key.reset(this.webhook.get('key'));
        }
    }

    onSubmit() {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        } else {
            this.form.controls.name.markAsDirty();
            this.form.controls.url.markAsDirty();
            this.form.controls.key.markAsDirty();
            this.form.controls.email.markAsDirty();
        }
        return false;
    }

    onCancel() {
        if (this.webhook) {
            this.store.dispatch(new SetWebhookEditAction(this.webhook.get('id'), false));
        } else {
            this.store.dispatch(new SetWebhookAddingAction(false));
        }
    }
}
