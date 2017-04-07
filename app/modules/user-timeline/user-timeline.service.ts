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
 * File: user-timeline.service.coffee
 */

import {Injectable} from "@angular/core";
import * as Immutable from "immutable";
import * as _ from "lodash";
import {EventType} from "./user-timeline.model";
import {UserTimelineItemTypeService} from "./user-timeline-item/user-timeline-item-type.service";
import {UserTimelineItemTitleService} from "./user-timeline-item/user-timeline-item-title.service";

interface FieldCheckFunc {
    (timeline: Immutable.Map<string, any>): boolean;
}

@Injectable()
export class UserTimelineService {

    _invalid: FieldCheckFunc[] = [
        // Items with only invalid fields
        (timeline) => {
            const _valid_fields: string[] = [
                    "status",
                    "subject",
                    "description_diff",
                    "assigned_to",
                    "points",
                    "severity",
                    "priority",
                    "type",
                    "attachments",
                    "is_iocaine",
                    "content_diff",
                    "name",
                    "estimated_finish",
                    "estimated_start",
                    // customs
                    "blocked",
                    "moveInBacklog",
                    "milestone",
                    "color",
            ];

            const value_diff = timeline.get("data").get("value_diff");

            if (value_diff) {
                const fieldKey = value_diff.get("key");

                if (_valid_fields.indexOf(fieldKey) === -1) {
                    return true;
                } else if ((fieldKey === "attachments") &&
                     (value_diff.get("value").get("new").size === 0)) {
                    return true;
                }
            }

            return false;
        },
        // Empty change
        (timeline) => {
            const event = timeline.get("event_type").split(".");
            const value_diff = timeline.get("data").get("value_diff");
            return (event[2] === "change") && (value_diff === undefined);
        },
        // Deleted
        (timeline) => {
            const event = timeline.get("event_type").split(".");
            return event[2] === "delete";
        },
        // Project change
        (timeline) => {
            const event = timeline.get("event_type").split(".");
            return (event[1] === "project") && (event[2] === "change");
        },
        // Comment deleted
        (timeline) => {
            return !!timeline.get("data").get("comment_deleted");
        },
        // Task milestone
        (timeline) => {
            const event = timeline.get("event_type").split(".");
            const value_diff = timeline.get("data").get("value_diff");

            if (value_diff &&
                 (event[1] === "task") &&
                 (event[2] === "change") &&
                 (value_diff.get("key") === "milestone")) {
                return timeline.get("data").get("value_diff").get("value");
            }

            return false;
        },
    ];

    constructor(private timelineType: UserTimelineItemTypeService,
                private timelineTitle: UserTimelineItemTitleService) {}

    filterInvalid(timeline) {
        return _.some(this._invalid, (invalid: any) => {
            return !invalid(timeline);
        });
    }

    attachExtraInfoToTimelineEntry(timeline) {
        const event = EventType.fromString(timeline.get("event_type"));
        const type = this.timelineType.getType(timeline, event);
        const title = this.timelineTitle.getTitle(timeline, event, type);

        timeline = timeline.set("title_html", title);
        timeline =  timeline.set("obj", timeline.getIn(["data", event.obj]));

        if (type.description) {
            timeline = timeline.set("description", type.description(timeline));
        }

        if (type.member) {
            timeline = timeline.set("member", type.member(timeline));
        }

        if ((timeline.getIn(["data", "value_diff", "key"]) === "attachments") &&
          timeline.hasIn(["data", "value_diff", "value", "new"])) {
            timeline = timeline.set("attachments", timeline.getIn(["data", "value_diff", "value", "new"]));
        }

        return timeline;
    }

    parseTimelineItem(item) {
        const event = EventType.fromString(item.get("event_type"));
        let values_diff = item.getIn(["data", "values_diff"]);

        if (values_diff && values_diff.size) {
            // blocked/unblocked change must be a single change
            if (values_diff.has("is_blocked")) {
                values_diff = Immutable.Map({blocked: values_diff});
            }

            if (values_diff.has("milestone")) {
                if (event.obj === "userstory") {
                    values_diff = Immutable.Map({moveInBacklog: values_diff});
                } else {
                    values_diff = values_diff.deleteIn(["values_diff", "milestone"]);
                }

            } else if (event.obj === "milestone") {
                values_diff = Immutable.Map({milestone: values_diff});
            }

            return Immutable.List(values_diff).map(([key, value]) => {
                const obj = Immutable.Map({
                    key,
                    value,
                });

                return item.setIn(["data", "value_diff"], obj)
                           .deleteIn(["data", "values_diff"]);
            });
        }

        return Immutable.List([item.deleteIn(["data", "values_diff"])]);
    }
}
