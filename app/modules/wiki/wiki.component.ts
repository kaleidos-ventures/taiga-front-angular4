import {Component, OnChanges, OnInit, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import * as Immutable from "immutable";
import * as actions from "./wiki.actions";
import "rxjs/add/operator/combineLatest";

@Component({
    template: require("./wiki.pug"),
})
export class WikiPage implements OnInit, OnDestroy, OnChanges {
    project: Observable<Immutable.Map<string, any>>;
    linksVisible: boolean = true;
    links: Observable<Immutable.List<any>>;
    page: Observable<Immutable.Map<string, any>>;
    pageAttachments: Observable<Immutable.List<any>>;
    historyEntries: Observable<Immutable.List<any>>;
    subscriptions: Subscription[];

    constructor(private store: Store<IState>, private route: ActivatedRoute, private router: Router) {
        this.project = this.store.select((state) => state.getIn(["projects", "current-project"]));
        this.links = this.store.select((state) => state.getIn(["wiki", "links"]));
        this.page = this.store.select((state) => state.getIn(["wiki", "page"]));
        this.pageAttachments = this.store.select((state) => state.getIn(["wiki", "page-attachments"]));
        this.historyEntries = this.store.select((state) => state.getIn(["wiki", "history"]))
                                        .map((historyEntries) => historyEntries.reverse());
    }

    ngOnInit() {
        this.subscriptions = [
            Observable.combineLatest(this.route.params, this.project).subscribe(([params, project]) => {
                console.log("ROUTE OR PROJECT CHANGED", params, project);
                if (project != null) {
                    if (params.page) {
                        this.store.dispatch(new actions.FetchWikiPageAction(project.get('id'), params.page))
                    }
                }
            }),

            this.project.subscribe((project) => {
                if (project != null) {
                    this.store.dispatch(new actions.FetchWikiLinksAction(project.get('id')))
                }
            }),

            this.page.subscribe((page) => {
                if (page != null) {
                    this.store.dispatch(new actions.FetchWikiPageAttachmentsAction(page.get('project'), page.get('id')));
                    this.store.dispatch(new actions.FetchWikiPageHistoryAction(page.get('id')));
                } else {
                    this.store.dispatch(new actions.SetWikiPageAttachmentsAction(Immutable.List()));
                    this.store.dispatch(new actions.SetWikiPageHistoryAction(Immutable.List()));
                }
            }),
        ]
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    onDelete({projectSlug, wikiPageId}) {
        this.store.dispatch(new actions.DeleteWikiPageAction(projectSlug, wikiPageId));
    }
}
