import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { IState } from "./app.store";
import { LogoutAction, RestoreUserAction } from "./modules/auth/auth.actions";
import { OpenLightboxAction, SendFeedbackAction } from "./app.actions";
import { FetchCurrentProjectAction, FetchUserProjectsAction } from "./modules/projects/projects.actions";
import { AppMetaService } from "./modules/services/app-meta.service";
import { Observable, Subscription } from "rxjs";
import * as Immutable from "immutable";

@Component({
  selector: "tg-view",
  template: require("./app.pug"),
})
export class AppComponent {
    user: Observable<Immutable.Map<string, any>>;
    projects: Observable<Immutable.List<any>>;
    errorHandling: any = {};
    currentProject: string = "";
    pageMetadata: Observable<Immutable.Map<string, any>>;
    subscriptions: Subscription[];
    isNavigationBarEnabled: boolean;

    constructor(private store: Store<IState>,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private translate: TranslateService,
                private appMeta: AppMetaService) {
        this.user = this.store.select((state) => state.getIn(["auth", "user"]));
        this.projects = this.store.select((state) => state.getIn(["projects", "user-projects"]));
        this.pageMetadata = this.store.select((state) => state.getIn(["global", "page-metadata"]));
        this.store.dispatch(new RestoreUserAction());
        this.translate.use("en");

        this.subscriptions = [
            // Fetch current project based on the URL
            this.store.select((state) => state.getIn(['router', 'path'])).subscribe((path) => {
                if (!path) { return }
                this.changeProject(path);
                this.enableDisableNavigationBar(path);
            }),
            this.user.subscribe((user) => {
                if (user) {
                    this.store.dispatch(new FetchUserProjectsAction(user.get("id")));
                }
            }),
            this.pageMetadata.subscribe((metadata) => {
                let metadataJs = metadata.toJS();
                this.appMeta.setAsync(
                    this.translate.get(metadataJs.title || 'Taiga', metadataJs.title_args || {}),
                    this.translate.get(metadataJs.description || 'Taiga', metadataJs.description_args || {})
                );
            }),
        ]
    }

    changeProject(path) {
        const splitted_path = path.split("/");

        if (splitted_path.length < 3) { return }
        if (splitted_path[1] !== "project") { return }
        if (splitted_path[2] === "new") { return }

        const slug = splitted_path[2];
        if (slug !== this.currentProject) {
            this.currentProject = slug;
            this.store.dispatch(new FetchCurrentProjectAction(slug));
        }
    }

    enableDisableNavigationBar(path) {
        const splitted_path = path.split("/");
        if (splitted_path.length < 2) { return }

        const sectionsWithoutHeader = [
            "invitation",
            "login",
            "register",
            "change-password",
        ]

        if (sectionsWithoutHeader.indexOf(splitted_path[1]) !== -1) {
            this.isNavigationBarEnabled = false
        } else {
            this.isNavigationBarEnabled = true
        }
    }

    onLogout() {
        this.store.dispatch(new LogoutAction());
    }

    onFeedback() {
        this.store.dispatch(new OpenLightboxAction("feedback"));
    }

    onFeedbackFilled(feedback) {
        this.store.dispatch(new SendFeedbackAction(feedback));
    }

    onLogin() {
        return this.router.navigate(["/login"], { queryParams: { next: this.router.url }});
    }
}
