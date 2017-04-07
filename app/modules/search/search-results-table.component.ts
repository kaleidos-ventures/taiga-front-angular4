import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-search-results-table",
    template: require("./search-results-table.pug"),
})
export class SearchResultsTable {
    @Input() project: Immutable.Map<string,any>;
    @Input() results: Immutable.List<any>;
    @Input() activeTab: string;

    getNameFromStatuses(statuses, id) {
        return statuses.filter((status) => status.get('id') === id).first().get("name")
    }

    getEpicStatus(epic) {
        return this.getNameFromStatuses(this.project.get('epic_statuses'), epic.get('status'));
    }

    getIssueStatus(issue) {
        return this.getNameFromStatuses(this.project.get('issue_statuses'), issue.get('status'));
    }

    getUsStatus(us) {
        return this.getNameFromStatuses(this.project.get('us_statuses'), us.get('status'));
    }

    getTaskStatus(task) {
        return this.getNameFromStatuses(this.project.get('task_statuses'), task.get('status'));
    }

    getAssignedTo(item) {
        return this.project.getIn(['members_by_id', item.get('assigned_to')]);
    }

}
