import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import {Observable} from "rxjs";
import * as Immutable from "immutable";

@Component({
    template: require("./project-details.pug"),
})
export class AdminProjectDetailsPage {
    project: Observable<Immutable.Map<string, any>>;

    constructor(private store: Store<IState>) {
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']));
    }
}
