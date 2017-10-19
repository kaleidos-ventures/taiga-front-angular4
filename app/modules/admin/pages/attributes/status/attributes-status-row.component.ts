import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import * as actions from "../../../admin.actions";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-attributes-status-row",
    template: require("./attributes-status-row.pug"),
})
export class AdminAttributesStatusRow {
    @Input() status: Immutable.Map<string, any>;
    @Input() type: string;
    @Input() visible: boolean;
    @Output() delete: EventEmitter<Immutable.Map<string, any>>;

    constructor(private store: Store<IState>) {
        this.delete = new EventEmitter();
    }

    onEdit() {
        this.store.dispatch(new actions.SetEditingStateAction(this.type, this.status.get('id'), true));
    }
}
