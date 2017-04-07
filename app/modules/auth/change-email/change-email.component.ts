import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IState } from "../../../app.store";
import { ConfigurationService } from "../../base/conf";
import { ChangeEmailAcceptAction } from "../auth.actions";
import { Observable, Subscription } from "rxjs"
import { CloseLightboxAction, SetMetadataAction } from "../../../app.actions";
import { calculateNextUrl } from "../utils";

import * as Immutable from "immutable";

@Component({
    template: require("./change-email.pug"),
})
export class ChangeEmailPage implements OnInit, OnDestroy {
    uuid: string;
    subscriptions: Subscription[];

    constructor(private config: ConfigurationService,
                private store: Store<IState>,
                private activeRoute: ActivatedRoute,
                private router: Router) {
        this.store.dispatch(new SetMetadataAction("CHANGE_EMAIL.PAGE_TITLE", {}, "CHANGE_EMAIL.PAGE_DESCRIPTION", {}))
    }

    ngOnInit() {
        this.subscriptions = [
            this.activeRoute.params.subscribe(({uuid}) => {
                this.uuid = uuid;
            }),
        ]
    }

    changeEmail() {
        this.store.dispatch(new ChangeEmailAcceptAction(this.uuid));
        return false;
    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
