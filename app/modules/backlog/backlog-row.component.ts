import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import {OpenLightboxAction} from "../../app.actions";
import * as actions from "./backlog.actions";
import * as Immutable from "immutable";

@Component({
    host: {"class": "row us-item-row"},
    selector: "tg-backlog-row",
    template: require("./backlog-row.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BacklogRow {
    @Input() project: Immutable.Map<string, any>;
    @Input() us: Immutable.Map<string, any>;
    @Input() showedRole: Immutable.Map<string, any>;
    @Input() checked: boolean;
    @Input() showTags: boolean;
    @Input() canEdit: boolean;
    displayStatusList: boolean = false;

    constructor(private store: Store<IState>) {
    }

    updateStatus(newStatus) {
        this.displayStatusList = false;
        this.store.dispatch(new actions.PatchUsStatusAction(this.us.get('id'), this.us.get('version'), newStatus))
    }

    selectUserstory(us, value) {
        if (value) {
            this.store.dispatch(new actions.AddSelectedUserstoriesAction(us.get('id')));
        } else {
            this.store.dispatch(new actions.RemoveSelectedUserstoriesAction(us.get('id')));
        }
    }

    editUserStory(us) {
        this.store.dispatch(new actions.FetchEditingUserStoryAction(us.get('project'), us.get('id')));
        this.store.dispatch(new OpenLightboxAction("backlog.new-us"));
    }
}
