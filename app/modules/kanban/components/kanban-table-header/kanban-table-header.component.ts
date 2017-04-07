import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Store} from "@ngrx/store";
import * as Immutable from "immutable";
import {OpenLightboxAction} from "../../../../app.actions";
import {IState} from "../../../../app.store";
import {SetBulkCreateLightboxDataAction, SetNewUsLightboxDataAction} from "../../kanban.actions";

@Component({
    selector: "tg-kanban-table-header",
    template: require("./kanban-table-header.pug"),
})
export class KanbanTableHeader {
    @Input() statuses: Immutable.List<any>;
    @Input() folds: any;
    @Input() nested: boolean;
    @Output("folds") foldsChange: EventEmitter<any>;
    @Input() archivedWatched: any = {};
    @Output("archivedWatched") archivedWatchedChange: EventEmitter<any>;

    constructor(private store: Store<IState>) {
        this.foldsChange = new EventEmitter();
        this.archivedWatchedChange = new EventEmitter();
    }

    foldStatus(status) {
        this.folds[status.get("id")] = true;
        this.foldsChange.emit(this.folds);
    }

    unfoldStatus(status) {
        this.folds[status.get("id")] = false;
        this.foldsChange.emit(this.folds);
    }

    archivedWatch(status) {
        this.archivedWatched[status.get("id")] = true;
        this.archivedWatchedChange.emit(this.archivedWatched);
    }

    archivedUnwatch(status) {
        this.archivedWatched[status.get("id")] = false;
        this.archivedWatchedChange.emit(this.archivedWatched);
    }

    addNewUs(type, status) {
        if (type === "bulk") {
            this.store.dispatch(new SetBulkCreateLightboxDataAction(status));
            this.store.dispatch(new OpenLightboxAction("kanban.bulk-create"));
        } else {
            this.store.dispatch(new SetNewUsLightboxDataAction(status, null));
            this.store.dispatch(new OpenLightboxAction("kanban.edit"));
        }
    }
}
