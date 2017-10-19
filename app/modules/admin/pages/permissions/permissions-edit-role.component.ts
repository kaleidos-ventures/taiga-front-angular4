import {Component, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import * as Immutable from "immutable";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UniversalValidators } from "ngx-validators";
import * as actions from "../../admin.actions";
import {CloseLightboxAction, OpenLightboxAction} from "../../../../app.actions";

@Component({
    selector: "tg-admin-edit-role",
    template: require("./permissions-edit-role.pug"),
})
export class AdminEditRole {
    @Input() role: Immutable.Map<string, any>;
    @Input() project: Immutable.Map<string, any>;
    @Input() noEstimableRoles: boolean;
    form: FormGroup;
    editingName: boolean = false;

    constructor(private store: Store<IState>,
                private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ["", Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(256),
            ])],
        })
    }

    ngOnChanges(changes) {
        if(changes.role && this.role) {
            this.form.controls.name.reset(this.role.get('name'))
        }
    }

    updateName(event) {
        if (this.form.valid) {
            this.editingName = false;
            this.store.dispatch(new actions.UpdateRoleNameAction(this.role.get('id'), this.form.value.name));
            this.form.controls.name.reset("");
        } else {
            this.form.controls.name.markAsDirty();
        }
    }

    manageEsc(event) {
        if (event.keyCode == 27) {
            this.editingName = false;
            this.form.controls.name.reset("");
        }
    }

    toggleComputable(event) {
        if (!this.role.get('computable')) {
            $(event.target).prop('checked', null);
            this.store.dispatch(new actions.UpdateRoleComputableAction(this.role.get('id'), true));
        } else {
            event.preventDefault();
            event.stopPropagation();
            $(event.target).prop('checked', "checked");
            this.store.dispatch(new OpenLightboxAction("roles.disable-computable"));
        }
    }

    onDisableComputableConfirm(event) {
        if(event) {
            this.store.dispatch(new actions.UpdateRoleComputableAction(this.role.get('id'), false));
        } else {
            this.store.dispatch(new CloseLightboxAction());
        }
    }
}
