import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { OpenLightboxAction } from "../../../app.actions";
import { IState } from "../../../app.store";
import * as actions from "../backlog.actions";
import * as moment from "moment";
import * as Immutable from "immutable";

@Component({
    selector: "tg-backlog-sprint-header",
    template: require("./backlog-sprint-header.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogSprintHeader {
    @Input() project: Immutable.Map<string, any>;
    @Input() sprint: Immutable.Map<string, any>;
    @Input() compactSprint: boolean;
    @Output() compactSprintChange: EventEmitter<boolean>;

    constructor(private store: Store<IState>, private translate: TranslateService) {
        this.compactSprintChange = new EventEmitter();
    }

    editSprint(sprint) {
        this.store.dispatch(new actions.SetEditingSprintAction(sprint));
        this.store.dispatch(new OpenLightboxAction("backlog.sprint-add-edit"));
    }

    estimatedDateRange() {
        const prettyDate = this.translate.instant("BACKLOG.SPRINTS.DATE");
        const start = moment(this.sprint.get('estimated_start')).format(prettyDate);
        const finish = moment(this.sprint.get('estimated_finish')).format(prettyDate);
        return `${start}-${finish}`;
    }
}
