import {Component, Input, OnChanges, AfterViewChecked, ViewChild} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UniversalValidators } from "ngx-validators";
import * as Immutable from "immutable";
import * as actions from "../../../admin.actions";

@Component({
    selector: "tg-admin-attributes-status-form",
    template: require("./attributes-status-form.pug"),
})
export class AdminAttributesStatusForm implements AfterViewChecked, OnChanges {
    @Input() status: Immutable.Map<string, any>;
    @Input() project: Immutable.Map<string, any>;
    @Input() visible: boolean;
    @Input() type: string;
    @ViewChild('input') nameInput;
    form: FormGroup;
    hasToFocus: boolean;

    constructor(private store: Store<IState>,
                private fb: FormBuilder) {
        this.form = this.fb.group({
            id: null,
            name: ["", Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(256),
            ])],
            color: [null, Validators.required],
            is_closed: [false, Validators.required],
            is_archived: false,
            wip_limit: [null, UniversalValidators.isNumber]
        });
    }

    ngOnChanges(changes) {
        if (changes.visible && !changes.visible.previousValue && changes.visible.currentValue) {
            this.hasToFocus = true;
        }
        if (changes.status && this.status) {
            this.form.reset({
                id: this.status.get('id'),
                color: this.status.get('color'),
                name: this.status.get('name'),
                is_closed: this.status.get('is_closed'),
                is_archived: this.status.get('is_archived'),
                wip_limit: this.status.get('wip_limit', false),
            })
        }
    }

    ngAfterViewChecked() {
        if (this.hasToFocus) {
            this.nameInput.nativeElement.focus();
            this.hasToFocus = false;
        }
    }

    onSubmit() {
        if (this.form.valid) {
            if(this.form.value.id) {
                this.store.dispatch(new actions.UpdateStateAction(this.type, this.form.value));
            } else{
                this.store.dispatch(new actions.CreateStateAction(this.project.get('id'), this.type, this.form.value));
            }
        } else {
            this.form.controls.color.markAsDirty();
            this.form.controls.name.markAsDirty();
            this.form.controls.isClosed.markAsDirty();
            this.form.controls.archived.markAsDirty();
            this.form.controls.wipLimit.markAsDirty();
        }
        return false;
    }

    onCancel() {
        if (this.status) {
            this.store.dispatch(new actions.SetEditingStateAction(this.type, this.status.get('id'), false));
        } else {
            this.store.dispatch(new actions.SetEditingStateAction(this.type, null, false));
        }
    }
}
