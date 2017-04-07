import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IState } from "../../../app.store";
import { ConfigurationService } from "../../base/conf";
import { ChangePasswordFromRecoveryAction } from "../auth.actions";
import { Observable, Subscription } from "rxjs"
import { CloseLightboxAction, SetMetadataAction } from "../../../app.actions";
import { GoAction } from "../../../router.actions";
import { calculateNextUrl } from "../utils";

import * as Immutable from "immutable";

@Component({
    selector: "tg-change-password-from-recovery-page",
    template: require("./change-password-from-recovery.pug"),
})
export class ChangePasswordFromRecoveryPage implements OnInit, OnDestroy {
    nextUrl: string;
    changePasswordErrors: Observable<Immutable.Map<string, any>>;
    currentUser: Observable<Immutable.Map<string, any>>;
    subscriptions: Subscription[];
    uuid: string;

    constructor(private config: ConfigurationService,
                private store: Store<IState>,
                private activeRoute: ActivatedRoute,
                private router: Router) {
        this.nextUrl = "/";
        this.uuid = "";
        this.changePasswordErrors = this.store.select((state) => state.getIn(["auth", "change-password-errors"]));
        this.currentUser = this.store.select((state) => state.getIn(["auth", "user"]));
        this.store.dispatch(new SetMetadataAction("CHANGE_PASSWORD.PAGE_TITLE", {}, "CHANGE_PASSWORD.PAGE_DESCRIPTION", {}))
    }

    ngOnInit() {
        this.subscriptions = [
            this.currentUser.combineLatest(this.activeRoute.queryParams).subscribe(([currentUser, params]) => {
                this.nextUrl = calculateNextUrl(params['next'], params['force_next']);
                if (currentUser) {
                    this.store.dispatch(new GoAction([this.nextUrl]));
                }
                return this.nextUrl
            }),
            this.activeRoute.params.subscribe(({uuid}) => {
                this.uuid = uuid;
            })
        ]
    }

    changePassword(newPassword: string) {
        this.store.dispatch(new ChangePasswordFromRecoveryAction(newPassword, this.uuid));
        return false;
    }

    closeLightbox() {
        this.store.dispatch(new CloseLightboxAction());
    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
