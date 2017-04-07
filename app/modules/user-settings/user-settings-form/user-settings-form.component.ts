import {Component, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import * as Immutable from "immutable";
import {ConfigurationService} from "../../base/conf";
import {TranslateService} from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmailValidators} from 'ngx-validators';
import {UniversalValidators} from 'ngx-validators';
import {UsernameValidator} from "../../utils/validators";
import {getDirtyValues, setServerErrors} from "../../utils/forms";

@Component({
    selector: "tg-user-settings-form",
    template: require("./user-settings-form.pug"),
})
export class UserSettingsForm implements OnChanges {
    @Input() user: Immutable.Map<string, any>;
    @Input() languages: Immutable.List<any>;
    @Input() formErrors: Immutable.Map<string, any>;
    @Input() loadingAvatar: boolean = false;
    @Output() deleteAccount: EventEmitter<number>;
    @Output() submitForm: EventEmitter<any>;
    @Output() photoChanged: EventEmitter<File>;
    availableThemes;
    defaultLanguage;
    defaultTheme;
    form: FormGroup;

    constructor(private config: ConfigurationService,
                private translate: TranslateService,
                private fb: FormBuilder) {
        this.deleteAccount = new EventEmitter();
        this.submitForm = new EventEmitter();
        this.photoChanged = new EventEmitter();
        this.availableThemes = this.config.get("themes", []);

        this.form = this.fb.group({
            username: ['', Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(255),
                UsernameValidator,
            ])],
            email: ['', Validators.compose([
                Validators.required,
                EmailValidators.normal,
                UniversalValidators.maxLength(255)
            ])],
            full_name: ['', Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(255)
            ])],
            lang: ['', ],
            theme: ['', ],
            bio: ['', UniversalValidators.maxLength(210)],
        });
    }

    ngOnChanges(changes) {
        if ((changes.user || changes.languages) && this.user && this.languages) {
            this.form.setValue({
                username: this.user.get('username'),
                email: this.user.get('email'),
                full_name: this.user.get('full_name'),
                lang: this.user.get('lang'),
                theme: this.user.get('theme'),
                bio: this.user.get('bio'),
            });
        }

        if (changes.formErrors) {
            setServerErrors(this.form, this.formErrors);
        }
    }

    onSubmit() {
        if (this.form.valid) {
            this.submitForm.emit({
                userId: this.user.get('id'),
                userData: getDirtyValues(this.form)
            })
        }
    }
}
