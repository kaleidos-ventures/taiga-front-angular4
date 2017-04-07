import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IState } from "../../../app.store";
import { ConfigurationService } from "../../base/conf";
import { LoginAction } from "../auth.actions";
import { LoginData } from "../auth.model";
import { Observable, Subscription } from "rxjs"
import { CloseLightboxAction, SetMetadataAction } from "../../../app.actions";
import { GoAction } from "../../../router.actions";
import { calculateNextUrl } from "../utils";

import * as Immutable from "immutable";

@Component({
    selector: "tg-login-page",
    template: require("./login.pug"),
})
export class LoginPage implements OnInit, OnDestroy {
    nextUrl: string;
    loginErrors: Observable<Immutable.Map<string, any>>;
    currentUser: Observable<Immutable.Map<string, any>>;
    subscriptions: Subscription[];

    constructor(private config: ConfigurationService,
                private store: Store<IState>,
                private activeRoute: ActivatedRoute,
                private router: Router) {
        this.nextUrl = "/";
        this.loginErrors = this.store.select((state) => state.getIn(["auth", "login-errors"]));
        this.currentUser = this.store.select((state) => state.getIn(["auth", "user"]));
        this.store.dispatch(new SetMetadataAction("LOGIN.PAGE_TITLE", {}, "LOGIN.PAGE_DESCRIPTION", {}))
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
        ]
    }

    login(loginData: LoginData) {
        this.store.dispatch(new LoginAction(loginData, this.nextUrl));
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
