import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import * as Immutable from "immutable";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import {StartLoadingAction, StopLoadingAction} from "../../app.actions";
import * as actions from "./detail.actions";

@Component({
    template: require("./detail-userstory.pug"),
})
export class DetailUserstoryPage implements OnInit, OnDestroy {
    us: Immutable.Map<string,any>;
    user: Immutable.Map<string,any>;
    project: Immutable.Map<string,any>;
    customAttributesValues: Immutable.Map<string,any>;
    tasks: Immutable.List<any>;
    attachments: Immutable.List<any>;
    subscriptions: Subscription[];
    canEdit: boolean;

    constructor(private store: Store<IState>, private route: ActivatedRoute) {
        this.store.dispatch(new StartLoadingAction());
    }

    ngOnInit() {
        let customAttributes = this.store.select((state) => state.getIn(["detail", "userstory-custom-attributes"]));
        let tasks = this.store.select((state) => state.getIn(["detail", "userstory-tasks"]));
        let attachments = this.store.select((state) => state.getIn(["detail", "userstory-attachments"]));

        this.subscriptions = [
            this.store.select((state) => state.getIn(["detail", "userstory"]))
                      .subscribe((state) => {
                          this.us = state;
                          if (state) {
                              this.store.dispatch(new actions.FetchDetailUserStoryCustomAttributesAction(state.get('id')));
                              this.store.dispatch(new actions.FetchDetailUserStoryTasksAction(this.project.get('id'), state.get('id')));
                              this.store.dispatch(new actions.FetchDetailUserStoryAttachmentsAction(this.project.get('id'), state.get('id')));
                          }
                      }),
            customAttributes.subscribe((state) => {
                this.customAttributesValues = state;
            }),
            tasks.subscribe((state) => {
                this.tasks = state;
            }),
            attachments.subscribe((state) => {
                this.attachments = state;
            }),
            customAttributes.combineLatest(tasks, attachments).subscribe((state) => {
                if(state[0] && state[1] && state[2]) {
                    this.store.dispatch(new StopLoadingAction());
                }
            }),
            this.store.select((state) => state.getIn(["projects", "current-project"]))
                      .subscribe((state) => {
                          this.project = state;
                          this.canEdit = this.canEditCheck();
                      }),
            this.store.select((state) => state.getIn(["auth", "user"]))
                      .subscribe((state) => this.user = state),
            this.store.select((state) => state.getIn(["projects", "current-project"]))
                      .combineLatest(this.route.params)
                      .subscribe(([project, params]) => {
                          if (project) {
                              this.store.dispatch(new actions.FetchDetailUserStoryAction(project.get('id'), params.ref));
                          }
                      })
        ];
    }

    canEditCheck() {
        if (this.project && this.project.get('my_permissions').contains(`modify_us`)) {
            return true;
        }
        return false;
    }

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}
