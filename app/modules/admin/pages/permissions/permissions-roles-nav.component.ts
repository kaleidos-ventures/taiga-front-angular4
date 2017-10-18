import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UniversalValidators } from "ngx-validators";
import * as Immutable from "immutable";
import * as actions from "../../admin.actions";

@Component({
    host: {"class": "menu-tertiary sidebar"},
    selector: "tg-admin-roles-nav",
    template: require("./permissions-roles-nav.pug"),
})
export class AdminRolesNav {
    @Input() project: Immutable.Map<string, any>;
    @Input() active: Immutable.Map<string, any>;
    @Output() setRole: EventEmitter<Immutable.Map<string, any>>;
    addingRole: boolean = false;
    form: FormGroup;

    constructor(private store: Store<IState>,
                private fb: FormBuilder) {
        this.setRole = new EventEmitter();
        this.form = this.fb.group({
            name: ["", Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(256),
            ])],
        })
    }

    create(event) {
        if (this.form.valid) {
            this.addingRole = false;
            let maxOrder = this.project.get('roles').map((r) => r.get('order')).filter((r) => r).max();
            let newRole = {
                project: this.project.get('id'),
                name: this.form.value.name,
                permissions: ["view_project", "view_milestones", "view_us", "view_tasks", "view_issues"],
                order: maxOrder + 1 || 1,
                computable: false
            }
            this.form.controls.name.reset("");
            this.store.dispatch(new actions.CreateRoleAction(this.project.get('slug'), newRole));
        } else {
            this.form.controls.name.markAsDirty();
        }
    }

    manageEsc(event) {
        if (event.keyCode == 27) {
            this.addingRole = false;
            this.form.controls.name.reset("");
        }
    }
}
