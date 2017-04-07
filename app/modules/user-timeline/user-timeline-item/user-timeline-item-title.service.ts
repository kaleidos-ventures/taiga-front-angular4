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
 * File: user-timeline-item-title.service.coffee
 */

import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import * as _ from "lodash";
import {unslugify} from "../../../libs/utils";

@Injectable()
export class UserTimelineItemTitleService {
    _fieldTranslationKey: any = {
        status: "COMMON.FIELDS.STATUS",
        subject: "COMMON.FIELDS.SUBJECT",
        description_diff: "COMMON.FIELDS.DESCRIPTION",
        points: "COMMON.FIELDS.POINTS",
        assigned_to: "COMMON.FIELDS.ASSIGNED_TO",
        severity: "ISSUES.FIELDS.SEVERITY",
        priority: "ISSUES.FIELDS.PRIORITY",
        type: "ISSUES.FIELDS.TYPE",
        is_iocaine: "TASK.FIELDS.IS_IOCAINE",
        is_blocked: "COMMON.FIELDS.IS_BLOCKED",
        color: "COMMON.FIELDS.COLOR",
    };
    _params: any = {
        username(timeline, event) {
            const user = timeline.getIn(["data", "user"]);

            if (user.get("is_profile_visible")) {
                const title_attr = this.translate.instant("COMMON.SEE_USER_PROFILE", {username: user.get("username")});
                const url = "user-profile:username=timeline.getIn(['data', 'user', 'username'])";

                return this._getLink(url, user.get("name"), title_attr);
            } else {
                return this._getUsernameSpan(user.get("name"));
            }
        },

        field_name(timeline, event) {
            const field_name = timeline.getIn(["data", "value_diff", "key"]);

            if (this._fieldTranslationKey[field_name]) {
                return this.translate.instant(this._fieldTranslationKey[field_name]);
            }
            return field_name
        },

        project_name(timeline, event) {
            const url = "project:project=timeline.getIn(['data', 'project', 'slug'])";

            return this._getLink(url, timeline.getIn(["data", "project", "name"]));
        },

        new_value(timeline, event) {
            let new_value;
            if (_.isArray(timeline.getIn(["data", "value_diff", "value"]).toJS())) {
                let value = timeline.getIn(["data", "value_diff", "value"]).get(1);

                // assigned to unasigned
                if ((value === null) && (timeline.getIn(["data", "value_diff", "key"]) === "assigned_to")) {
                    value = this.translate.instant("ACTIVITY.VALUES.UNASSIGNED");
                }

                new_value = value;
            } else {
                new_value = timeline.getIn(["data", "value_diff", "value"]).first().get(1);
            }

            return _.escape(new_value);
        },

        sprint_name(timeline, event) {
            const url = "project-taskboard:project=timeline.getIn(['data', 'project', 'slug']),sprint=timeline.getIn(['data', 'milestone', 'slug'])";

            return this._getLink(url, timeline.getIn(["data", "milestone", "name"]));
        },

        us_name(timeline, event) {
            const obj = this._getTimelineObj(timeline, event).get("userstory");

            const event_us = {obj: "parent_userstory"};
            const url = this._getDetailObjUrl(event_us);

            const text = `#${obj.get("ref")} ${obj.get("subject")}`;

            return this._getLink(url, text);
        },

        related_us_name(timeline, event) {
            const obj = timeline.getIn(["data", "userstory"]);
            const url = "project-userstories-detail:project=timeline.getIn(['data', 'userstory', 'project', 'slug']),ref=timeline.getIn(['data', 'userstory', 'ref'])";
            const text = `#${obj.get("ref")} ${obj.get("subject")}`;
            return this._getLink(url, text);
        },

        epic_name(timeline, event) {
            const obj = timeline.getIn(["data", "epic"]);
            const url = "project-epics-detail:project=timeline.getIn(['data', 'project', 'slug']),ref=timeline.getIn(['data', 'epic', 'ref'])";
            const text = `#${obj.get("ref")} ${obj.get("subject")}`;
            return this._getLink(url, text);
        },

        obj_name(timeline, event) {
            let text;
            const obj = this._getTimelineObj(timeline, event);
            const url = this._getDetailObjUrl(event);

            if (event.obj === "wikipage") {
                text = unslugify(obj.get("slug"));
            } else if (event.obj === "milestone") {
                text = obj.get("name");
            } else {
                text = `#${obj.get("ref")} ${obj.get("subject")}`;
            }

            return this._getLink(url, text);
        },

        role_name(timeline, event) {
            return _.escape(timeline.getIn(["data", "value_diff", "value"]).keySeq().first());
        },
    };
    constructor(private translate: TranslateService) {}

    _translateTitleParams(param, timeline, event) {
        return this._params[param].call(this, timeline, event);
    }

    _getTimelineObj(timeline, event) {
        return timeline.getIn(["data", event.obj]);
    }

    _getDetailObjUrl(event) {
        const url = {
            issue: ["project-issues-detail", ":project=timeline.getIn(['data', 'project', 'slug']),ref=timeline.getIn(['obj', 'ref'])"],
            wikipage: ["project-wiki-page", ":project=timeline.getIn(['data', 'project', 'slug']),slug=timeline.getIn(['obj', 'slug'])"],
            task: ["project-tasks-detail", ":project=timeline.getIn(['data', 'project', 'slug']),ref=timeline.getIn(['obj', 'ref'])"],
            userstory: ["project-userstories-detail", ":project=timeline.getIn(['data', 'project', 'slug']),ref=timeline.getIn(['obj', 'ref'])"],
            parent_userstory: ["project-userstories-detail", ":project=timeline.getIn(['data', 'project', 'slug']),ref=timeline.getIn(['obj', 'userstory', 'ref'])"],
            milestone: ["project-taskboard", ":project=timeline.getIn(['data', 'project', 'slug']),sprint=timeline.getIn(['obj', 'slug'])"],
            epic: ["project-epics-detail", ":project=timeline.getIn(['data', 'project', 'slug']),ref=timeline.getIn(['obj', 'ref'])"],
        };
        return url[event.obj][0] + url[event.obj][1];
    }

    _getLink(url, text, title) {
        title = title || text;

        const span = $("<span>")
            .attr("ng-non-bindable", "1")
            .text(text);

        return $("<a>")
            .attr("tg-nav", url)
            .attr("title", title)
            .append(span)
            .prop("outerHTML");
    }

    _getUsernameSpan(text) {
        return $("<span>")
            .addClass("username")
            .text(text)
            .prop("outerHTML");
    }

    _getParams(timeline, event, timeline_type) {
        const params = {};
        const translateParams = (timeline_type && timeline_type.translate_params) || [];

        translateParams.forEach((param) => {
            return params[param] = this._translateTitleParams(param, timeline, event);
        });
        return params;
    }

    getTitle(timeline, event, type) {
        const params = this._getParams(timeline, event, type);

        const paramsKeys = {};
        Object.keys(params).forEach((key) => paramsKeys[key] = `{{${key}}}`);

        let translation = this.translate.instant(type.key, paramsKeys);

        Object.keys(params).forEach(function(key) {
            const find = `{{${key}}}`;
            return translation = translation.replace(new RegExp(find, "g"), params[key]);
        });

        return translation;
    }
}
