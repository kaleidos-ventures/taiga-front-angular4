import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { IState } from "../../../app.store";
import { ConfigurationService } from "../../base/conf";
import { calculateNextUrl } from "../utils";
import { SetMetadataAction } from "../../../app.actions";
import { PasswordRecoverAction } from "../auth.actions";

@Component({
    selector: "tg-forgot-password-page",
    template: require("./forgot-password.pug"),
})
export class ForgotPasswordPage {
    nextUrl: string;

    constructor(private config: ConfigurationService,
                private store: Store<IState>,
                private activeRoute: ActivatedRoute) {
        this.nextUrl = "/";
        this.store.dispatch(new SetMetadataAction("FORGOT_PASSWORD.PAGE_TITLE", {}, "FORGOT_PASSWORD.PAGE_DESCRIPTION", {}))
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params) => {
            this.nextUrl = calculateNextUrl(params["next"], params["force_next"]);
        });
    }

    passwordRecover(email: string) {
        this.store.dispatch(new PasswordRecoverAction(email));
    }
}
