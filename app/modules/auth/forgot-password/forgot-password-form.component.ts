import {Component, EventEmitter, OnInit, OnDestroy, Output} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import { ConfigurationService } from "../../base/conf";
import {LoginData} from "../auth.model";
import {Subscription} from "rxjs";

@Component({
    selector: "tg-forgot-password-form",
    template: require("./forgot-password-form.pug"),
})
export class ForgotPasswordForm implements OnInit, OnDestroy {
    @Output() recover: EventEmitter<LoginData>;
    forgotPasswordForm: FormGroup;
    queryParams: any;
    subscriptions: Subscription[];

    constructor(private config: ConfigurationService,
                private fb: FormBuilder,
                private activeRoute: ActivatedRoute) {
        this.recover = new EventEmitter();
        this.forgotPasswordForm = this.fb.group({
            username: ["", Validators.required],
        });
    }

    ngOnInit() {
        this.subscriptions = [
            this.activeRoute.queryParams.subscribe((params) => {
                this.queryParams = params;
            })
        ]
    }

    onSubmit(): boolean {
        if (this.forgotPasswordForm.valid) {
            this.recover.emit(this.forgotPasswordForm.value.username);
        } else {
            this.forgotPasswordForm.controls.username.markAsDirty();
        }
        return false;
    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
