import {Component, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import * as Immutable from "immutable";
import * as actions from "../../admin.actions";
import {CloseLightboxAction} from "../../../../app.actions";

@Component({
    selector: "tg-permissions-roles-delete-lightbox",
    template: require("./permissions-roles-delete-lightbox.pug"),
})
export class AdminPermissionsRolesDeleteLightbox {
    @Input() project: Immutable.Map<string,any>;
    @Input() role: Immutable.Map<string,any>;

    constructor(private store: Store<IState>) {}

    filterRoles(roles) {
        return roles.filter((role) => this.role.get('id') != role.get('id'))
    }

    onDeleteConfirm(newRole) {
        if(newRole) {
            this.store.dispatch(new actions.DeleteRoleAction(this.project.get('slug'), this.role.get('id'), newRole))
        } else {
            this.store.dispatch(new CloseLightboxAction());
        }
    }
}
