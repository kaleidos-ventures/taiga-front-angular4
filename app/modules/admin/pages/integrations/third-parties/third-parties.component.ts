import {Component, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UniversalValidators } from "ngx-validators";
import * as Immutable from "immutable";
import {Observable, Subscription} from "rxjs";
import * as actions from "../../../admin.actions";

@Component({
    template: require("./third-parties.pug"),
})
export class AdminIntegrationsThirdPartiesPage {
    project: Observable<Immutable.Map<string, any>>;
    currentProject: Immutable.Map<string, any>;
    thirdPartyData: Observable<Immutable.Map<string, any>>;
    form: FormGroup;
    queryParams: any;
    copyLabel: boolean;
    subscriptions: Subscription[];
    type: string;
    section: string;

    constructor(private fb: FormBuilder,
                private activeRoute: ActivatedRoute,
                private store: Store<IState>) {
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']))
        this.thirdPartyData = this.store.select((state) => state.getIn(['admin', 'third-party']))
        this.form = this.fb.group({
            secretKey: ["", Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(256),
            ])],
            webhookUrl: [""],
            validIps: [""],
        });
    }

    ngOnInit() {
        this.subscriptions = [
            this.activeRoute.params.subscribe((params) => {
                this.type = params.type;
                this.copyLabel = false;
                if (this.type == "github") {
                    this.section = "Github"
                } else if (this.type == "gitlab") {
                    this.section = "GitLab"
                } else if (this.type == "gogs") {
                    this.section = "Gogs"
                } else if (this.type == "bitbucket") {
                    this.section = "BitBucket"
                }
            }),
            this.project.combineLatest(this.activeRoute.params).subscribe(([project, params]) => {
                if (project && params.type) {
                    this.store.dispatch(new actions.FetchAdminThirdPartyAction(project.get('id'), params.type));
                    this.currentProject = project;
                }
            }),
            this.thirdPartyData.subscribe((data) => {
                if (data) {
                    this.form.controls.secretKey.reset(data.get('secret', ''))
                    this.form.controls.validIps.reset(data.get('valid_origin_ips', []).join(","))
                    this.form.controls.webhookUrl.reset(data.get('webhooks_url', ''))
                }
            })
        ]
    }

    onSubmit() {
        if (this.form.valid) {
            this.store.dispatch(new actions.StoreAdminThirdPartyAction(this.currentProject.get('id'), this.type, this.form.value));
        } else {
            this.form.controls.username.markAsDirty();
            this.form.controls.password.markAsDirty();
            this.form.controls.full_name.markAsDirty();
            this.form.controls.email.markAsDirty();
        }
        return false;
    }
}
