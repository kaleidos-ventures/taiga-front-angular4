import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UniversalValidators } from "ngx-validators";
import { UsernameValidator } from "../../utils/validators";
import {EmailValidators} from 'ngx-validators';
import { ConfigurationService } from "../../base/conf";
import {ActivatedRoute} from "@angular/router";
import {RegisterData} from "../auth.model";
import {Subscription} from "rxjs";

@Component({
    selector: "tg-register-form",
    template: require("./register-form.pug"),
})
export class RegisterForm implements OnInit, OnDestroy {
    @Output() register: EventEmitter<RegisterData>;
    @Input() title: string;
    registerForm: FormGroup;
    queryParams: any;
    subscriptions: Subscription[];

    constructor(private config: ConfigurationService,
                private fb: FormBuilder,
                private activeRoute: ActivatedRoute) {
        this.register = new EventEmitter();
        this.registerForm = this.fb.group({
            username: ["", Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(256),
                UsernameValidator,
            ])],
            password: ["", Validators.compose([
                Validators.required,
                UniversalValidators.minLength(6)
            ])],
            full_name: ["", Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(256)
            ])],
            email: ["", Validators.compose([
                Validators.required,
                EmailValidators.normal,
                UniversalValidators.maxLength(256)
            ])],
            type: "normal",
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
        if (this.registerForm.valid) {
            this.register.emit(this.registerForm.value);
        } else {
            this.registerForm.controls.username.markAsDirty();
            this.registerForm.controls.password.markAsDirty();
            this.registerForm.controls.full_name.markAsDirty();
            this.registerForm.controls.email.markAsDirty();
        }
        return false;
    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
