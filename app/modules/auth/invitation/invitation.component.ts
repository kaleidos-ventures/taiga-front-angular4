import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IState } from "../../../app.store";
import { ConfigurationService } from "../../base/conf";
import { LoginAction, RegisterAction, FetchInvitationAction } from "../auth.actions";
import { LoginData, RegisterData } from "../auth.model";
import { Observable, Subscription } from "rxjs"
import { CloseLightboxAction, SetMetadataAction } from "../../../app.actions";
import { calculateNextUrl } from "../utils";

import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    selector: "tg-invitation-page",
    template: require("./invitation.pug"),
})
export class InvitationPage implements OnInit, OnDestroy {
    uuid: string;
    invitation: Immutable.Map<string, any>;
    subscriptions: Subscription[];

    constructor(private config: ConfigurationService,
                private store: Store<IState>,
                private activeRoute: ActivatedRoute,
                private router: Router) {
        this.store.dispatch(new SetMetadataAction("INVITATION.PAGE_TITLE", {}, "INVITATION.PAGE_DESCRIPTION", {}))
    }

    ngOnInit() {
        this.subscriptions = [
            this.activeRoute.params.subscribe(({uuid}) => {
                this.uuid = uuid;
                this.store.dispatch(new FetchInvitationAction(uuid));
            }),
            this.store.select((state) => state.getIn(["auth", "invitation"])).subscribe((invitation) => {
                this.invitation = invitation;
            })

        ]
    }

    onLogin(loginData: LoginData) {
        let data = _.extend({}, loginData, {invitation_token: this.uuid});
        const next = "/project/" + this.invitation.get('project_slug');
        this.store.dispatch(new LoginAction(loginData, next));
        return false;
    }

    onRegister(registerData: RegisterData) {
        let data = _.extend({}, registerData, {token: this.uuid});
        const next = "/project/" + this.invitation.get('project_slug');
        this.store.dispatch(new RegisterAction(data, next));
        return false;
    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
