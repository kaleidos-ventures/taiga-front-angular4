import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IState } from "../../../app.store";
import { ConfigurationService } from "../../base/conf";
import { RegisterAction } from "../auth.actions";
import { RegisterData } from "../auth.model";
import { Observable, Subscription } from "rxjs"
import { CloseLightboxAction, SetMetadataAction } from "../../../app.actions";
import { calculateNextUrl } from "../utils";

import * as Immutable from "immutable";

@Component({
    selector: "tg-register-page",
    template: require("./register.pug"),
})
export class RegisterPage implements OnInit, OnDestroy {
    nextUrl: string;
    registerErrors: Observable<Immutable.Map<string, any>>;
    currentUser: Observable<Immutable.Map<string, any>>;
    subscriptions: Subscription[];

    constructor(private config: ConfigurationService,
                private store: Store<IState>,
                private activeRoute: ActivatedRoute,
                private router: Router) {
        this.nextUrl = "/";
        this.registerErrors = this.store.select((state) => state.getIn(["auth", "register-errors"]));
        this.currentUser = this.store.select((state) => state.getIn(["auth", "user"]));
        this.store.dispatch(new SetMetadataAction("REGISTER.PAGE_TITLE", {}, "REGISTER.PAGE_DESCRIPTION", {}))
    }

    ngOnInit() {
        this.subscriptions = [
            this.activeRoute.queryParams.subscribe((params) => {
                this.nextUrl = calculateNextUrl(params['next'], params['force_next']);
                return this.nextUrl
            }),
        ]
    }

    register(registerData: RegisterData) {
        this.store.dispatch(new RegisterAction(registerData, this.nextUrl));
        return false;
    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
