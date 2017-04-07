import {Component, Input, OnChanges} from "@angular/core";
import {IState} from "../../../../../app.store";
import {OpenLightboxAction, CloseLightboxAction} from "../../../../../app.actions";
import {Store} from "@ngrx/store";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-attributes-tags-editor",
    template: require("./attributes-tags-editor.pug"),
})
export class AdminAttributesTagsEditor implements OnChanges {
    @Input() type: string;
    @Input() name: string;
    @Input() addLabel: string;
    @Input() project: Immutable.Map<string, any>;
    values: Immutable.List<any> = Immutable.List();
    editing: any = {};
    merging: any = {to: null, from: {}};
    filter: string = "";
    deletingItem: Immutable.Map<string, any>;

    constructor(private store: Store<IState>) {}

    ngOnChanges(changes) {
        if (this.project) {
            this.values = this.project.get("tags_colors").map(
                (value, key) => Immutable.fromJS({id: key, name: key, color: value})
            )
            .toList()
            .sortBy((item) => item.get('id'))
        }
    }

    filteredValues() {
        return this.values.filter((item) => item.get('id').indexOf(this.filter) !== -1);
    }

    deleteItem(item) {
        this.deletingItem = item;
        this.store.dispatch(new OpenLightboxAction('admin.delete-tag'))
    }

    confirmDelete(response) {
        this.store.dispatch(new CloseLightboxAction())
    }
}
