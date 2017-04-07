import {Component, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../../app.store";
import {Observable, Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import * as Immutable from "immutable"

@Component({
    template: require("./attributes-issues-types.pug"),
})
export class AdminAttributesIssuesTypesPage {
    project: Observable<Immutable.Map<string, any>>;
    currentAttribute: Immutable.Map<string, any> = null;

    constructor(private store: Store<IState>, private translate: TranslateService) {
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']))
    }
}
