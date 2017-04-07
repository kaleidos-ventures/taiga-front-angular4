import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";
import { Store } from "@ngrx/store";
import { OpenLightboxAction } from "../../../app.actions";
import { IState } from "../../../app.store";
import * as actions from "../backlog.actions";

@Component({
    selector: "tg-backlog-sprints",
    template: require("./backlog-sprints.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogSprints {
    @Input() sprints: Immutable.Map<string, any>;
    @Input() project: Immutable.Map<string, any>;
    loadingClosed: boolean = false;

    constructor(private store: Store<IState>) {}

    totalSprints() {
        return this.sprints.get('closed') + this.sprints.get('open');
    }

    newSprint() {
        this.store.dispatch(new actions.SetEditingSprintAction(null));
        this.store.dispatch(new OpenLightboxAction("backlog.sprint-add-edit"));
    }

    loadClosedSprints() {
        this.store.dispatch(new actions.FetchBacklogClosedSprintsAction(this.project.get('id')));
        this.loadingClosed = true;
    }
}
