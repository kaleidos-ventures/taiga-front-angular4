import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import * as Immutable from "immutable";
import * as actions from "./backlog.actions";

@Component({
    selector: "tg-backlog-table",
    template: require("./backlog-table.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogTable {
    @Input() project: Immutable.Map<string, any>;
    @Input() userstories: Immutable.List<any>;
    @Input() selectedUserstories: Immutable.List<any>;
    @Input() currentSprint: Immutable.Map<string, any>;
    @Input() doomlinePosition: number;
    @Input() showTags: boolean;

    constructor(private store: Store<IState>) {}

    selectAllChange(value) {
        if (value) {
            this.store.dispatch(new actions.SetSelectedUserstoriesAction(
                this.userstories.reduce((acc, us) => acc.set(us.get('id'), true), Immutable.Map())
            ));
        } else {
            this.store.dispatch(new actions.SetSelectedUserstoriesAction(Immutable.Map({})));
        }
    }
}
