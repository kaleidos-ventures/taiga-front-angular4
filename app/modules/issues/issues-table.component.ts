import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import {UpdateSearchAction} from "../../router.actions";
import * as Immutable from "immutable";

@Component({
    selector: "tg-issues-table",
    template: require("./issues-table.pug"),
})
export class IssuesTable {
    @Input() project: Immutable.Map<string, any>;
    @Input() issues: Immutable.List<any>;
    @Input() order: string;
    @Output() addNewIssue: EventEmitter<boolean>;
    @Output() addIssuesInBulk: EventEmitter<boolean>;

    constructor(private store: Store<IState>) {
        this.addNewIssue = new EventEmitter()
        this.addIssuesInBulk = new EventEmitter()
    }

    sort(field) {
        if (this.order === field) {
            this.store.dispatch(new UpdateSearchAction({order_by: `-${field}`}));
        } else {
            this.store.dispatch(new UpdateSearchAction({order_by: field}));
        }
    }
}
