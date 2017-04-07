import {Component, EventEmitter, Output, OnInit, OnDestroy} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfigurationService } from "../../base/conf";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import { PasswordValidators } from "ngx-validators";
import { UniversalValidators } from "ngx-validators";

@Component({
    selector: "tg-change-password-from-recovery-form",
    template: require("./change-password-from-recovery-form.pug"),
})
export class ChangePasswordFromRecoveryForm implements OnInit, OnDestroy {
    @Output() changePassword: EventEmitter<string>;
    changePasswordForm: FormGroup;
    queryParams: any;
    subscriptions: Subscription[];

    constructor(private config: ConfigurationService,
                private fb: FormBuilder,
                private activeRoute: ActivatedRoute) {
        this.changePassword = new EventEmitter();
        this.changePasswordForm = this.fb.group({
            password: ["", Validators.compose([
                Validators.required,
                UniversalValidators.minLength(6)
            ])],
            password2: "",
        }, {validator: PasswordValidators.mismatchedPasswords('password', 'password2')});
    }

    ngOnInit() {
        this.subscriptions = [
            this.activeRoute.queryParams.subscribe((params) => {
                this.queryParams = params;
            })
        ]
    }

    onSubmit(): boolean {
        if (this.changePasswordForm.valid) {
            this.changePassword.emit(this.changePasswordForm.controls.password.value);
        } else {
            this.changePasswordForm.controls.password.markAsDirty();
            this.changePasswordForm.controls.password2.markAsDirty();
        }
        return false;
    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
