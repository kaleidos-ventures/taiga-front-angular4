import * as Immutable from "immutable";

import {Component, OnDestroy, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/zip";
import { StartLoadingAction, StopLoadingAction, OpenLightboxAction, CloseLightboxAction, SetMetadataAction} from "../../app.actions";
import { IState } from "../../app.store";
import { FetchCurrentProjectAction } from "../projects/projects.actions";
import { ZoomLevelService } from "../services/zoom-level.service";
import * as actions from "./epics.actions";

@Component({
    template: require("./epics.pug"),
})
export class EpicsPage implements OnInit, OnDestroy {
    section = "epics";
    project: Observable<Immutable.Map<string, any>>;
    statuses: Observable<Immutable.List<any>>;
    epics: Observable<Immutable.List<any>>;
    userStories: Observable<Immutable.List<any>>;
    assignedOnAssignedTo: Observable<Immutable.List<any>>;
    members: Observable<any>;
    subscriptions: Subscription[];
    currentEpic: Immutable.Map<string, any>;
    currentProjectId: number;

    constructor(private store: Store<IState>,
                private route: ActivatedRoute,
                private translate: TranslateService,
                private zoomLevel: ZoomLevelService) {
        this.project = this.store.select((state) => state.getIn(["projects", "current-project"]));
        this.statuses = this.store.select((state) => state.getIn(["projects", "current-project", "epic_statuses"]));
        this.members = this.store.select((state) => state.getIn(["projects", "current-project", "members"]));
        this.userStories = this.store.select((state) => state.getIn(["epics", "user-stories"]));
        this.epics = this.store.select((state) => state.getIn(["epics", "epics"]))
                               .filter((epics) => epics !== null)
                               .do(() => this.store.dispatch(new StopLoadingAction()));
        this.assignedOnAssignedTo = this.store.select((state) => state.getIn(["epics", "current-epic", "assigned_to"]))
                                              .map((id) => Immutable.List([id]))
    }

    ngOnInit() {
        this.store.dispatch(new StartLoadingAction());
        this.subscriptions = [
            this.project.subscribe((project) => {
                if (project) {
                    this.store.dispatch(new SetMetadataAction(
                        "EPICS.PAGE_TITLE",
                        {projectName: project.get("name")},
                        "EPICS.PAGE_DESCRIPTION",
                        {projectName: project.get("name"), projectDescription: project.get('description')},
                    ));
                    this.currentProjectId = project.get('id');
                    this.store.dispatch(new actions.FetchEpicsAction(project.get("id")));
                }
            }),
            this.store.select((state) => state.getIn(["epics", "current-epic"])).subscribe((currentEpic) => {
                this.currentEpic = currentEpic;
            })
        ];
    }

    onSorted(value) {
        console.log(value);
    }

    onAddEpicClicked() {
        this.store.dispatch(new OpenLightboxAction("epics.add"));
    }

    ngOnDestroy() {
        for (const subs of this.subscriptions) {
            subs.unsubscribe();
        }
        this.store.dispatch(new actions.CleanEpicsDataAction());
    }

    createNewEpic(epicData) {
        this.store.dispatch(new actions.PutNewEpicAction(this.currentProjectId, epicData));
    }

    assignEpic(userId) {
        this.store.dispatch(new CloseLightboxAction());
        this.store.dispatch(new actions.PatchEpicAssignedToAction(
            this.currentEpic.get('id'),
            this.currentEpic.get('version'),
            userId
        ))
    }
}
