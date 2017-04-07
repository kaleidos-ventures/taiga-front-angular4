import {Component, Input, OnChanges} from "@angular/core";
import {IState} from "../../../../../app.store";
import {OpenLightboxAction, CloseLightboxAction} from "../../../../../app.actions";
import {Store} from "@ngrx/store";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-attributes-custom-fields-editor",
    template: require("./attributes-custom-fields-editor.pug"),
})
export class AdminAttributesCustomFieldsEditor implements OnChanges {
    @Input() type: string;
    @Input() name: string;
    @Input() project: Immutable.Map<string, any>;
    values: Immutable.List<any>;
    editing: any = {};
    deletingItem: Immutable.Map<string, any>;

    constructor(private store: Store<IState>) {}

    ngOnChanges(changes) {
        if (this.project) {
            if (this.type == "epics") {
                this.values = this.project.get("epic_custom_attributes")
            } else if (this.type == "userstories") {
                this.values = this.project.get("userstory_custom_attributes")
            } else if (this.type == "tasks") {
                this.values = this.project.get("task_custom_attributes")
            } else if (this.type == "issues") {
                this.values = this.project.get("issue_custom_attributes")
            }
            this.values = this.values.sortBy((item) => item.get('order')).toList();
        }
    }

    deleteItem(item) {
        this.deletingItem = item;
        this.store.dispatch(new OpenLightboxAction('admin.delete-custom-field-' + this.type))
    }

    confirmDelete(response) {
        this.store.dispatch(new CloseLightboxAction())
    }
}
