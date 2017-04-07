import {Component, Output, EventEmitter} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PasswordValidators, UniversalValidators} from 'ngx-validators';

@Component({
    selector: "tg-change-password-form",
    template: require("./change-password-form.pug"),
})
export class ChangePasswordForm {
    @Output() changePassword: EventEmitter<any>;
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.changePassword = new EventEmitter();
        this.form = this.fb.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', Validators.compose([
                Validators.required,
                UniversalValidators.minLength(6)
            ])],
            repeatPassword: ['', Validators.required],
        }, {validator: PasswordValidators.mismatchedPasswords('newPassword', 'repeatPassword')});
    }

    onSubmit($event) {
        $event.preventDefault()
        if (this.form.valid) {
            this.changePassword.emit(this.form.value);
        }
    }
}
