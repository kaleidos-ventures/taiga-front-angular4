/*
 * Copyright (C) 2014-2017 Taiga Agile LLC <taiga@taiga.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: user-timeline-item-type.service.coffee
 */

import {Injectable} from "@angular/core";
import * as Immutable from "immutable";
import * as _ from "lodash";

interface TimelineType {
    check(timeline: Immutable.Map<string, any>, event: Immutable.Map<string, any>): boolean;
    key: string;
    translate_params: string[];
    member?(timeline: Immutable.Map<string, any>): Immutable.Map<string, any>;
    description?(timeline: Immutable.Map<string, any>): string;
}

class NewMember implements TimelineType {
    key = "TIMELINE.NEW_MEMBER";
    translate_params = ["project_name"];

    check(timeline, event) {
        return event.obj === 'membership';
    }

    member(timeline) {
        return Immutable.Map({
            user: timeline.getIn(["data", "user"]),
            role: timeline.getIn(["data", "role"]),
        });
    }
}

class NewProject implements TimelineType {
    key = "TIMELINE.NEW_PROJECT";
    translate_params = ["username", "project_name"];

    check(timeline, event) {
        return (event.obj === "project") && (event.type === "create");
    }

    description(timeline) {
        return timeline.getIn(["data", "project", "description"]);
    }
}

class NewAttachment implements TimelineType {
    key = "TIMELINE.UPLOAD_ATTACHMENT";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        return (event.type === "change") &&
             timeline.hasIn(["data", "value_diff"]) &&
             (timeline.getIn(["data", "value_diff", "key"]) === "attachments");
    }
}

class NewUs implements TimelineType {
    key = "TIMELINE.US_CREATED";
    translate_params = ["username", "project_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "userstory") && (event.type === "create");
    }
}

class NewIssue implements TimelineType {
    key = "TIMELINE.ISSUE_CREATED";
    translate_params = ["username", "project_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "issue") && (event.type === "create");
    }
}

class NewWiki implements TimelineType {
    key = "TIMELINE.WIKI_CREATED";
    translate_params = ["username", "project_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "wikipage") && (event.type === "create");
    }
}

class NewTask implements TimelineType {
    key = "TIMELINE.TASK_CREATED";
    translate_params = ["username", "project_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "task") && (event.type === "create") && !timeline.getIn(["data", "task", "userstory"]);
    }
}

class NewTaskWithUs implements TimelineType {
    key = "TIMELINE.TASK_CREATED_WITH_US";
    translate_params = ["username", "project_name", "obj_name", "us_name"];

    check(timeline, event) {
        return (event.obj === "task") && (event.type === "create") && timeline.getIn(["data", "task", "userstory"]);
    }
}

class NewMilestone implements TimelineType {
    key = "TIMELINE.MILESTONE_CREATED";
    translate_params = ["username", "project_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "milestone") && (event.type === "create");
    }
}

class NewEpic implements TimelineType {
    key = "TIMELINE.EPIC_CREATED";
    translate_params = ["username", "project_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "epic") && (event.type === "create");
    }
}

class NewEpicRelatedUserstory implements TimelineType {
    key = "TIMELINE.EPIC_RELATED_USERSTORY_CREATED";
    translate_params = ["username", "project_name", "related_us_name", "epic_name"];

    check(timeline, event) {
        return (event.obj === "relateduserstory") && (event.type === "create");
    }
}

class NewUsComment implements TimelineType {
    key = "TIMELINE.NEW_COMMENT_US";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        return timeline.getIn(["data", "comment"]) && (event.obj === "userstory");
    }

    description(timeline) {
        const text = timeline.getIn(["data", "comment_html"]);
        return $($.parseHTML(text)).text();
    }
}

class NewIssueComment implements TimelineType {
    key = "TIMELINE.NEW_COMMENT_ISSUE";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        return timeline.getIn(["data", "comment"]) && (event.obj === "issue");
    }

    description(timeline) {
        const text = timeline.getIn(["data", "comment_html"]);
        return $($.parseHTML(text)).text();
    }
}

class NewTaskComment implements TimelineType {
    key = "TIMELINE.NEW_COMMENT_TASK";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        return timeline.getIn(["data", "comment"]) && (event.obj === "task");
    }

    description(timeline) {
        const text = timeline.getIn(["data", "comment_html"]);
        return $($.parseHTML(text)).text();
    }
}

class NewEpicComment implements TimelineType {
    key = "TIMELINE.NEW_COMMENT_EPIC";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        return timeline.getIn(["data", "comment"]) && (event.obj === "epic");
    }

    description(timeline) {
        const text = timeline.getIn(["data", "comment_html"]);
        return $($.parseHTML(text)).text();
    }
}

class UsMove implements TimelineType {
    key = "TIMELINE.US_MOVED";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        return timeline.hasIn(["data", "value_diff"]) &&
              (timeline.getIn(["data", "value_diff", "key"]) === "moveInBacklog") &&
              timeline.hasIn(["data", "value_diff", "value", "backlog_order"]) &&
              (event.type === "change");
    }
}

class UsToBacklog implements TimelineType {
    key = "TIMELINE.US_REMOVED_FROM_MILESTONE";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        if (timeline.hasIn(["data", "value_diff"]) &&
              (timeline.getIn(["data", "value_diff", "key"]) === "moveInBacklog") &&
              (event.type === "change") &&
              (event.obj === "userstory")) {

            return timeline.getIn(["data", "value_diff", "value", "milestone"]).get(1) === null;
        }

        return false;
    }
}

class UsToMilestone implements TimelineType {
    key = "TIMELINE.US_ADDED_MILESTONE";
    translate_params = ["username", "obj_name", "sprint_name"];

    check(timeline, event) {
        return timeline.hasIn(["data", "value_diff"]) &&
              (timeline.getIn(["data", "value_diff", "key"]) === "moveInBacklog") &&
              (event.type === "change") &&
              (event.obj === "userstory");
    }
}

class Blocked implements TimelineType {
    key = "TIMELINE.BLOCKED";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        if (timeline.hasIn(["data", "value_diff"]) &&
              (timeline.getIn(["data", "value_diff", "key"]) === "blocked") &&
              (event.type === "change")) {
            return timeline.getIn(["data", "value_diff", "value", "is_blocked"]).get(1) === true;
        }

        return false;
    }

    description(timeline) {
        if (timeline.hasIn(["data", "value_diff", "value", "blocked_note_html"])) {
            const text = timeline.getIn(["data", "value_diff", "value", "blocked_note_html"]).get(1);
            return $($.parseHTML(text)).text();
        }
        return null;
    }
}

class UnBlocked implements TimelineType {
    key = "TIMELINE.UNBLOCKED";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        if (timeline.hasIn(["data", "value_diff"]) &&
              (timeline.getIn(["data", "value_diff", "key"]) === "blocked") &&
              (event.type === "change")) {
            return timeline.getIn(["data", "value_diff", "value", "is_blocked"]).get(1) === false;
        }

        return false;
    }
}

class MilestoneUpdated implements TimelineType {
    key = "TIMELINE.MILESTONE_UPDATED";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        return (event.obj === "milestone") && (event.type === "change");
    }
}

class MilestoneDeleted implements TimelineType {
    key = "TIMELINE.MILESTONE_DELETED";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        return (event.obj === "milestone") && (event.type === "delete");
    }
}

class WikiUpdated implements TimelineType {
    key = "TIMELINE.WIKI_UPDATED";
    translate_params = ["username", "obj_name"];

    check(timeline, event) {
        return (event.obj === "wikipage") && (event.type === "change");
    }
}

class UsUpdatedPoints implements TimelineType {
    key = "TIMELINE.US_UPDATED_POINTS";
    translate_params = ["username", "field_name", "obj_name", "new_value", "role_name"];

    check(timeline, event) {
        return (event.obj === "userstory") &&
            (event.type === "change") &&
            timeline.hasIn(["data", "value_diff"]) &&
            (timeline.getIn(["data", "value_diff", "key"]) === "points");
    }
}

class UsUpdatedDescription implements TimelineType {
    key = "TIMELINE.US_UPDATED";
    translate_params = ["username", "field_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "userstory") &&
            (event.type === "change") &&
            timeline.hasIn(["data", "value_diff"]) &&
            (timeline.getIn(["data", "value_diff", "key"]) === "description_diff");
    }
}

class UsUpdatedGeneral implements TimelineType {
    key = "TIMELINE.US_UPDATED_WITH_NEW_VALUE";
    translate_params = ["username", "field_name", "obj_name", "new_value"];

    check(timeline, event) {
        return (event.obj === "userstory") &&
            (event.type === "change");
    }
}

class IssueUpdatedDescription implements TimelineType {
    key = "TIMELINE.ISSUE_UPDATED";
    translate_params = ["username", "field_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "issue") &&
            (event.type === "change") &&
            timeline.hasIn(["data", "value_diff"]) &&
            (timeline.getIn(["data", "value_diff", "key"]) === "description_diff");
    }
}

class IssueUpdatedGeneral implements TimelineType {
    key = "TIMELINE.ISSUE_UPDATED_WITH_NEW_VALUE";
    translate_params = ["username", "field_name", "obj_name", "new_value"];

    check(timeline, event) {
        return (event.obj === "issue") &&
            (event.type === "change");
    }
}

class TaskUpdatedDescription implements TimelineType {
    key = "TIMELINE.TASK_UPDATED";
    translate_params = ["username", "field_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "task") &&
            (event.type === "change") &&
            !timeline.getIn(["data", "task", "userstory"]) &&
            timeline.hasIn(["data", "value_diff"]) &&
            (timeline.getIn(["data", "value_diff", "key"]) === "description_diff");
    }
}

class TaskUpdatedWithUsDescription implements TimelineType {
    key = "TIMELINE.TASK_UPDATED_WITH_US";
    translate_params = ["username", "field_name", "obj_name", "us_name"];

    check(timeline, event) {
        return (event.obj === "task") &&
            (event.type === "change") &&
            timeline.getIn(["data", "task", "userstory"]) &&
            timeline.hasIn(["data", "value_diff"]) &&
            (timeline.getIn(["data", "value_diff", "key"]) === "description_diff");
    }
}

class TaskUpdatedGeneral implements TimelineType {
    key = "TIMELINE.TASK_UPDATED_WITH_NEW_VALUE";
    translate_params = ["username", "field_name", "obj_name", "new_value"];

    check(timeline, event) {
        return (event.obj === "task") &&
            (event.type === "change") &&
            !timeline.getIn(["data", "task", "userstory"]);
    }
}

class TaskUpdatedWithUs implements TimelineType {
    key = "TIMELINE.TASK_UPDATED_WITH_US_NEW_VALUE";
    translate_params = ["username", "field_name", "obj_name", "us_name", "new_value"];

    check(timeline, event) {
        return (event.obj === "task") &&
            (event.type === "change") &&
            timeline.getIn(["data", "task", "userstory"]);
    }
}

class EpicUpdatedDescription implements TimelineType {
    key = "TIMELINE.EPIC_UPDATED";
    translate_params = ["username", "field_name", "obj_name"];

    check(timeline, event) {
        return (event.obj === "epic") &&
            (event.type === "change") &&
            timeline.hasIn(["data", "value_diff"]) &&
            (timeline.getIn(["data", "value_diff", "key"]) === "description_diff");
    }
}

class EpicUpdatedColor implements TimelineType {
    key = "TIMELINE.EPIC_UPDATED_WITH_NEW_COLOR";
    translate_params = ["username", "field_name", "obj_name", "new_value"];

    check(timeline, event) {
        return (event.obj === "epic") &&
            (event.type === "change") &&
            timeline.hasIn(["data", "value_diff"]) &&
            (timeline.getIn(["data", "value_diff", "key"]) === "color");
    }
}

class EpicUpdatedGeneral implements TimelineType {
    key = "TIMELINE.EPIC_UPDATED_WITH_NEW_VALUE";
    translate_params = ["username", "field_name", "obj_name", "new_value"];

    check(timeline, event) {
        return (event.obj === "epic") &&
            (event.type === "change");
    }
}

class NewUser implements TimelineType {
    key = "TIMELINE.NEW_USER";
    translate_params = ["username"];

    check(timeline, event) {
        return (event.obj === "user") && (event.type === "create");
    }
}

@Injectable()
export class UserTimelineItemTypeService {
    types: TimelineType[];

    constructor() {
        this.types = [
            new NewMember(),
            new NewProject(),
            new NewAttachment(),
            new NewUs(),
            new NewIssue(),
            new NewWiki(),
            new NewTask(),
            new NewTaskWithUs(),
            new NewMilestone(),
            new NewEpic(),
            new NewEpicRelatedUserstory(),
            new NewUsComment(),
            new NewIssueComment(),
            new NewTaskComment(),
            new NewEpicComment(),
            new UsMove(),
            new UsToBacklog(),
            new UsToMilestone(),
            new Blocked(),
            new UnBlocked(),
            new MilestoneUpdated(),
            new WikiUpdated(),
            new UsUpdatedPoints(),
            new UsUpdatedDescription(),
            new UsUpdatedGeneral(),
            new IssueUpdatedDescription(),
            new IssueUpdatedGeneral(),
            new TaskUpdatedDescription(),
            new TaskUpdatedWithUsDescription(),
            new TaskUpdatedGeneral(),
            new TaskUpdatedWithUs(),
            new EpicUpdatedDescription(),
            new EpicUpdatedColor(),
            new EpicUpdatedGeneral(),
            new NewUser(),
            new MilestoneDeleted(),
        ];
    }

    getType(timeline, event): TimelineType {
        return _.find(this.types, (obj) => obj.check(timeline, event));
    }
}
