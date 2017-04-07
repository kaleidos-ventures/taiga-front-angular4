import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import {SetCurrentEpicAction, FetchEpicUserStoriesAction, PatchEpicStatusAction} from "../epics.actions";
import {OpenLightboxAction} from "../../../app.actions";

@Component({
    selector: "tg-epic-row",
    template: require("./epic-row.pug"),
})
export class EpicRow {
    @Input() project: Immutable.Map<string, any>;
    @Input() epic: Immutable.Map<string, any>;
    @Input() userStories: Immutable.List<any>;
    @Input() columns: any;
    displayUserStories: boolean;
    displayStatusList: boolean;

    constructor(private store: Store<IState>) {}

    canEditEpics() {
        // TODO: Implement it
        return true;
    }

    toggleDisplayUserStories() {
        if (!this.userStories) {
            this.store.dispatch(new FetchEpicUserStoriesAction(this.epic.get('id')));
        }
        this.displayUserStories = !this.displayUserStories;
    }

    percentage() {
        let progress= this.epic.getIn(['user_stories_counts', 'progress']);
        let total = this.epic.getIn(['user_stories_counts', 'total']);

        if (total) {
            return (100 * progress) / total;
        }
        return 0;
    }

    updateStatus(newStatus) {
        this.displayStatusList = false;
        this.store.dispatch(new PatchEpicStatusAction(this.epic.get('id'), this.epic.get('version'), newStatus))
    }

    assignTo() {
        this.store.dispatch(new OpenLightboxAction("epics.assign-to"));
        this.store.dispatch(new SetCurrentEpicAction(this.epic));
    }
}
