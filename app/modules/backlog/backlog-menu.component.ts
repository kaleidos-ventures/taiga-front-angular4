import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";
import {OpenLightboxAction} from "../../app.actions";
import * as actions from "./backlog.actions";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";

@Component({
    selector: "tg-backlog-menu",
    template: require("./backlog-menu.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogMenu {
    @Input() userstories: Immutable.List<any>;
    @Input() selectedUserstories: Immutable.Map<string, boolean>;
    @Input() stats: Immutable.List<any>;
    @Input() currentSprint: Immutable.Map<string, any>;
    @Input() latestSprint: Immutable.Map<string, any>;
    @Input() showFilters: boolean = false;
    @Input() showTags: boolean = false;
    @Output() showFiltersChange: EventEmitter<boolean>;
    @Output() showTagsChange: EventEmitter<boolean>;

    constructor(private store: Store<IState>) {
        this.showFiltersChange = new EventEmitter();
        this.showTagsChange = new EventEmitter();
    }

    addUserstoriesToMilestone(sprint) {
        let userstoriesMap = this.userstories.reduce((acc, us) => acc.set(us.get('id'), us), Immutable.Map())
        this.store.dispatch(new actions.MoveUserStoriesToSprintAction(
            sprint.get('project'),
            sprint.get('id'),
            this.selectedUserstories.keySeq().map((us) => (
                {us_id: us, order: userstoriesMap.getIn([us, 'sprint_order'])}
            )).toJS()
        ));
    }

    addNewUs() {
        this.store.dispatch(new actions.SetEditingUserStoryAction(null));
        this.store.dispatch(new OpenLightboxAction("backlog.new-us"));
    }

    addNewUsBulk() {
        this.store.dispatch(new OpenLightboxAction("backlog.new-us-bulk"));
    }

}
