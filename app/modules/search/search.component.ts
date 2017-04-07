import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute } from '@angular/router';
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import {StartLoadingAction, StopLoadingAction} from "../../app.actions";
import {Observable, Subscription} from "rxjs";
import {SearchAction} from "../../router.actions";
import * as actions from "./search.actions";
import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    template: require("./search.pug"),
})
export class SearchPage implements OnDestroy, OnInit {
    project: Observable<Immutable.Map<string, any>>;
    user: Observable<Immutable.Map<string, any>>;
    searchResults: Observable<Immutable.Map<string, any>>;
    text: string;
    activeTab: string = "epics";
    subscriptions: Subscription[] = [];

    constructor(private store: Store<IState>, private route: ActivatedRoute) {
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']));
        this.searchResults = this.store.select((state) => state.getIn(['search', 'results']));
        this.user = this.store.select((state) => state.getIn(['auth', 'user']));
    }

    ngOnInit() {
        this.store.dispatch(new StartLoadingAction());
        this.subscriptions = [
            this.route.queryParams.combineLatest(this.project).subscribe(([params, project]) => {
                if (project) {
                    this.text = params.text;
                    this.store.dispatch(new actions.SearchInProjectAction(project.get('id'), params.text));
                }
            }),
            this.searchResults.filter((results) => results !== null).first().subscribe(() => {
                this.store.dispatch(new StopLoadingAction());
            })
        ];
    }

    onChangeTerm = _.debounce((value) => {
        this.store.dispatch(new SearchAction({text: this.text}))
    }, 300)

    ngOnDestroy() {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
        this.store.dispatch(new actions.CleanSearchDataAction());
    }
}
