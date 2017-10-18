import {Component, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import {Observable, Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import * as Immutable from "immutable";
import {OpenLightboxAction, CloseLightboxAction} from "../../../../app.actions";

@Component({
    template: require("./permissions.pug"),
})
export class AdminPermissionsPage implements OnDestroy {
    project: Observable<Immutable.Map<string, any>>;
    roles: Observable<Immutable.List<any>>;
    currentRole: Immutable.Map<string, any> = null;
    noEstimableRoles: boolean;
    subscriptions: Subscription[];

    constructor(private store: Store<IState>, private translate: TranslateService) {
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']))
                                 .map(this.insertExternalRole.bind(this))

        this.subscriptions = [
            this.project.subscribe((project) => {
                if (project) {
                    this.currentRole = project.getIn(['roles', 0]);
                    this.noEstimableRoles = !project.get('roles').some((role) => role.get('computable'));
                }
            })
        ]
    }

    insertExternalRole(project) {
         if (!project) { return project; }

         return project.update('roles', (roles) => {
             return roles.map((role) => role.set('external_user', false))
                         .push(Immutable.fromJS({
                             name: this.translate.instant("ADMIN.ROLES.EXTERNAL_USER"),
                             permissions: project.get('public_permissions').toJS(),
                             external_user: true,
                         }));
         })
    }

    ngOnDestroy() {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe()
        }
    }

    onDeleteRole() {
        this.store.dispatch(new OpenLightboxAction("roles.delete-role"));
    }
}
