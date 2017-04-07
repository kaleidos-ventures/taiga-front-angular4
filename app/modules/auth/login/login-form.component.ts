import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfigurationService } from "../../base/conf";
import {ActivatedRoute} from "@angular/router";
import {LoginData} from "../auth.model";
import {Subscription} from "rxjs";

@Component({
    selector: "tg-login-form",
    template: require("./login-form.pug"),
})
export class LoginForm implements OnInit, OnDestroy {
    @Output() login: EventEmitter<LoginData>;
    @Input() title: string;
    loginForm: FormGroup;
    queryParams: any;
    subscriptions: Subscription[];

    constructor(private config: ConfigurationService,
                private fb: FormBuilder,
                private activeRoute: ActivatedRoute) {
        this.login = new EventEmitter();
        this.loginForm = this.fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
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
        if (this.loginForm.valid) {
            this.login.emit(this.loginForm.value);
        } else {
            this.loginForm.controls.username.markAsDirty();
            this.loginForm.controls.password.markAsDirty();
        }
        return false;
    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
