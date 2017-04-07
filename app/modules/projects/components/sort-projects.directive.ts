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
 * File: sort-projects.directive.coffee
 */

import {autoScroll} from "../../../libs/dom-autoscroller";

import * as dragula from "dragula";
import * as _ from "lodash";

export let SortProjectsDirective = function(currentUserService) {
    const link = function(scope, el, attrs, ctrl) {
        let itemEl = null;

        const drake = dragula([el[0]], {
            copySortSource: false,
            copy: false,
            mirrorContainer: el[0],
            moves(item) { return $(item).hasClass("list-itemtype-project"); },
        } as dragula.DragulaOptions);

        drake.on("dragend", function(item) {
            itemEl = $(item);
            const { project } = itemEl.scope();
            let index = itemEl.index();

            let sorted_project_ids = _.map(scope.projects.toJS(), (p: any) => p.id);
            sorted_project_ids = _.without(sorted_project_ids, project.get("id"));
            sorted_project_ids.splice(index, 0, project.get("id"));

            const sortData = [];

            for (index = 0; index < sorted_project_ids.length; index++) {
                const value = sorted_project_ids[index];
                sortData.push({project_id: value, order: index});
            }

            return currentUserService.bulkUpdateProjectsOrder(sortData);
        });

        const scroll = autoScroll(window, {
            margin: 20,
            pixels: 30,
            scrollWhenOutside: true,
            autoScroll() {
                return this.down && drake.dragging;
            },
        });

        return scope.$on("$destroy", function() {
            el.off();
            return drake.destroy();
        });
    };

    const directive = {
        scope: {
            projects: "=tgSortProjects",
        },
        link,
    };

    return directive;
};
