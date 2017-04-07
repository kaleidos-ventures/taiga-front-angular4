import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import * as Immutable from "immutable";
import {FetchWikiLinksAction, FetchWikiPagesListAction} from "./wiki.actions";

@Component({
    template: require("./wiki-list.pug"),
})
export class WikiListPage {
    project: Observable<Immutable.Map<string, any>>;
    linksVisible: boolean = true;
    links: Observable<Immutable.List<any>>;
    pages: Observable<Immutable.List<any>>;

    constructor(private store: Store<IState>, private route: ActivatedRoute) {
        this.project = this.store.select((state) => state.getIn(["projects", "current-project"]));
        this.links = this.store.select((state) => state.getIn(["wiki", "links"]));
        this.pages = this.store.select((state) => state.getIn(["wiki", "pages"]));
    }

    ngOnInit() {
        this.project.subscribe((project) => {
            if (project != null) {
                this.store.dispatch(new FetchWikiLinksAction(project.get('id')))
                this.store.dispatch(new FetchWikiPagesListAction(project.get('id')))
            }
        });
    }
}
