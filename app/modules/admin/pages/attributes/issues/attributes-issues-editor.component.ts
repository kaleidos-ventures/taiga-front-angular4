import {Component, Input, OnChanges} from "@angular/core";
import {IState} from "../../../../../app.store";
import {OpenLightboxAction, CloseLightboxAction} from "../../../../../app.actions";
import {Store} from "@ngrx/store";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-attributes-issues-editor",
    template: require("./attributes-issues-editor.pug"),
})
export class AdminAttributesIssuesEditor implements OnChanges {
    @Input() type: string;
    @Input() name: string;
    @Input() addLabel: string;
    @Input() project: Immutable.Map<string, any>;
    values: Immutable.List<any>;
    editing: any = {};
    deletingItem: Immutable.Map<string, any>;

    constructor(private store: Store<IState>) {}

    ngOnChanges(changes) {
        if (this.project) {
            if (this.type == "severities") {
                this.values = this.project.get("severities")
            } else if (this.type == "priorities") {
                this.values = this.project.get("priorities")
            } else if (this.type == "types") {
                this.values = this.project.get("issue_types")
            }
        }
    }

    deleteItem(item) {
        this.deletingItem = item;
        this.store.dispatch(new OpenLightboxAction('admin.delete-issues-' + this.type))
    }

    otherItems(item) {
        if (this.values && item) {
            return this.values.filter((i) => i.get('id') != item.get('id'));
        }
    }

    confirmDelete(response) {
        this.store.dispatch(new CloseLightboxAction())
    }
}
