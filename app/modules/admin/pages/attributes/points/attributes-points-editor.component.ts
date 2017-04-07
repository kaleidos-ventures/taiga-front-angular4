import {Component, Input, OnChanges} from "@angular/core";
import {IState} from "../../../../../app.store";
import {OpenLightboxAction, CloseLightboxAction} from "../../../../../app.actions";
import {Store} from "@ngrx/store";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-attributes-points-editor",
    template: require("./attributes-points-editor.pug"),
})
export class AdminAttributesPointsEditor implements OnChanges {
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
            this.values = this.project.get("points")
        }
    }

    deleteItem(item) {
        this.deletingItem = item;
        this.store.dispatch(new OpenLightboxAction('admin.delete-points'))
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
