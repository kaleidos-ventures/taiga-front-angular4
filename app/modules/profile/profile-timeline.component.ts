import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import * as Immutable from "immutable";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import * as actions from "./profile.actions";

@Component({
    selector: "tg-profile-timeline",
    template: `<tg-user-timeline [timeline]="timeline?.get('timeline')" (needMore)="loadMore()" [scrollDisabled]="!timeline?.get('hasNext')">
               </tg-user-timeline>`,
})
export class ProfileTimeline implements OnInit, OnDestroy {
    @Input() user: Immutable.Map<string, any>;
    @Input() timeline: Immutable.Map<string, any>;
    page:number = 1;

    constructor(private store: Store<IState>) {}

    ngOnInit() {
        this.store.dispatch(new actions.FetchProfileTimelineAction(this.user.get('id'), this.page));
    }

    loadMore() {
        this.page++;
        this.store.dispatch(new actions.FetchProfileTimelineAction(this.user.get('id'), this.page));
    }

    ngOnDestroy() {
        this.store.dispatch(new actions.SetProfileTimelineAction(null));
    }
}
