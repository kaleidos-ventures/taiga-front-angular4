import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import {OpenLightboxAction, CloseLightboxAction} from "../../../app.actions";
import {TeamLeaveProjectAction} from "../team.actions";
import * as Immutable from "immutable";

@Component({
    selector: "tg-leave-project",
    template: require("./leave-project.pug"),
})
export class LeaveProject {
    @Input() user: Immutable.Map<string, any>;
    @Input() project: Immutable.Map<string, any>;
    @Output() leave: EventEmitter<number>;

    constructor(private store: Store<IState>) {
        this.leave = new EventEmitter();
    }

    onLeaveClicked() {
        this.store.dispatch(new OpenLightboxAction("team.leave-project"));
    }

    onResponse(value, projectId) {
        if (value === true) {
            this.store.dispatch(new TeamLeaveProjectAction(projectId));
        }
        this.store.dispatch(new CloseLightboxAction());
    }
}
