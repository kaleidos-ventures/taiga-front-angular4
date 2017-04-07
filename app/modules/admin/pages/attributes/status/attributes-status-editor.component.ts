import {Component, Input, OnChanges} from "@angular/core";
import {IState} from "../../../../../app.store";
import {OpenLightboxAction, CloseLightboxAction} from "../../../../../app.actions";
import {Store} from "@ngrx/store";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-attributes-status-editor",
    template: require("./attributes-status-editor.pug"),
})
export class AdminAttributesStatusEditor implements OnChanges {
    @Input() type: string;
    @Input() name: string;
    @Input() project: Immutable.Map<string, any>;
    values: Immutable.List<any>;
    editing: any = {};
    deletingStatus: Immutable.Map<string, any>;

    constructor(private store: Store<IState>) {}

    ngOnChanges(changes) {
        if (this.project) {
            if (this.type == "epic-statuses") {
                this.values = this.project.get('epic_statuses')
            } else if (this.type == "userstory-statuses") {
                this.values = this.project.get('us_statuses')
            } else if (this.type == "task-statuses") {
                this.values = this.project.get('task_statuses')
            } else if (this.type == "issue-statuses") {
                this.values = this.project.get('issue_statuses')
            }
        }
    }

    deleteStatus(status) {
        this.deletingStatus = status;
        this.store.dispatch(new OpenLightboxAction('admin.delete-statuses-' + this.type))
    }

    otherStatuses(status) {
        if (this.values && status) {
            return this.values.filter((item) => item.get('id') != status.get('id'));
        }
    }

    confirmDelete(response) {
        this.store.dispatch(new CloseLightboxAction())
    }
}
