import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as _ from "lodash";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import { GoAction } from '../../router.actions';
import { ResourcesService } from "../resources/resources.service";
import * as actions from "./wiki.actions";

// TODO: Add derivated effects like success messages

@Injectable()
export class WikiEffects {
    @Effect()
    fetchWikiPage$: Observable<Action> = this.actions$
        .ofType("FETCH_WIKI_PAGE")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.wiki.getBySlug(payload.projectId, payload.slug).map((wikiPage) => {
              return new actions.SetWikiPageAction(wikiPage.data);
          }).catch(() => {
              return Observable.of(new actions.SetWikiPageAction(null));
          });
        });

    @Effect()
    fetchWikiPagesList$: Observable<Action> = this.actions$
        .ofType("FETCH_WIKI_PAGES_LIST")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.wiki.list(projectId).map((wikiPagesList) => {
              return new actions.SetWikiPagesListAction(wikiPagesList.data);
          });
        });

    @Effect()
    fetchWikiPageHistory: Observable<Action> = this.actions$
        .ofType("FETCH_WIKI_PAGE_HISTORY")
        .map(toPayload)
        .switchMap((wikiId) => {
          return this.rs.wiki.getHistory(wikiId).map((wikiPageHistory) => {
              return new actions.SetWikiPageHistoryAction(wikiPageHistory.data);
          });
        });

    @Effect()
    fetchWikiPageAttachments: Observable<Action> = this.actions$
        .ofType("FETCH_WIKI_PAGE_ATTACHMENTS")
        .map(toPayload)
        .switchMap((payload) => {
          return this.rs.attachments.list("wiki_page", payload.wikiId, payload.projectId).map((attachments) => {
              return new actions.SetWikiPageAttachmentsAction(attachments.data);
          });
        });

    @Effect()
    fetchWikiLinks$: Observable<Action> = this.actions$
        .ofType("FETCH_WIKI_LINKS")
        .map(toPayload)
        .switchMap((projectId) => {
          return this.rs.wiki.listLinks(projectId).map((links) => {
              return new actions.SetWikiLinksAction(links.data);
          });
        });

    @Effect()
    modifyWikiPage$: Observable<Action> = this.actions$
        .ofType("MODIFY_WIKI_PAGE")
        .map(toPayload)
        .switchMap((payload) => {
           return this.rs.wiki.update(payload.wikiId, payload.content, payload.version).map((stats) => {
               return new actions.SetWikiPageAction(stats.getIn(["projects", "total"]));
           });
        });

    @Effect()
    deleteWikiPage$: Observable<Action> = this.actions$
        .ofType("DELETE_WIKI_PAGE")
        .map(toPayload)
        .switchMap(({projectSlug, wikiPageId}) => {
           return this.rs.wiki.delete(wikiPageId).switchMap((result) => {
               return Observable.from([
                   new actions.SetWikiPageAction(null),
                   new GoAction(["/project", projectSlug, "wiki"])
               ])
           });
        });

    @Effect()
    deleteWikiLink$: Observable<Action> = this.actions$
        .ofType("DELETE_WIKI_LINK")
        .map(toPayload)
        .switchMap((wikiLinkId) => {
           return this.rs.wiki.deleteLink(wikiLinkId).map(() => {
               return new actions.RemoveWikiLinkAction(wikiLinkId);
           });
        });

    @Effect()
    createWikiLink$: Observable<Action> = this.actions$
        .ofType("CREATE_WIKI_LINK")
        .map(toPayload)
        .switchMap(({projectId, title}) => {
           return this.rs.wiki.createLink(projectId, title).map((wikiLink) => {
               return new actions.AddWikiLinkAction(wikiLink.data);
           });
        });

    constructor(private actions$: Actions, private rs: ResourcesService) { }
}
