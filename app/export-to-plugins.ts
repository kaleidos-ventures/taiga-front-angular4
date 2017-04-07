/*
 * Copyright (C) 2014-2017 Andrey Antukh <niwi@niwi.nz>
 * Copyright (C) 2014-2017 Jesús Espino Garcia <jespinog@gmail.com>
 * Copyright (C) 2014-2017 David Barragán Merino <bameda@dbarragan.com>
 * Copyright (C) 2014-2017 Alejandro Alonso <alejandro.alonso@kaleidos.net>
 * Copyright (C) 2014-2017 Juan Francisco Alcántara <juanfran.alcantara@kaleidos.net>
 * Copyright (C) 2014-2017 Xavi Julian <xavier.julian@kaleidos.net>
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
 * File: utils.coffee
 */

import * as _ from "lodash";
import * as utils from "./libs/utils";

const taiga = {
    addClass: utils.addClass,
    nl2br: utils.nl2br,
    trim: utils.trim,
    slugify: utils.slugify,
    unslugify: utils.unslugify,
    toggleText: utils.toggleText,
    groupBy: utils.groupBy,
    timeout: utils.timeout,
    cancelTimeout: utils.cancelTimeout,
    scopeDefer: utils.scopeDefer,
    toString: utils.toString,
    joinStr: utils.joinStr,
    debounce: utils.debounce,
    debounceLeading: utils.debounceLeading,
    startswith: utils.startswith,
    truncate: utils.truncate,
    sizeFormat: utils.sizeFormat,
    stripTags: utils.stripTags,
    replaceTags: utils.replaceTags,
    defineImmutableProperty: utils.defineImmutableProperty,
    isImage: utils.isImage,
    isPdf: utils.isPdf,
    patch: utils.patch,
    getMatches: utils.getMatches,
    cartesianProduct: utils.cartesianProduct,
};

(window as any).taiga = taiga;
(window as any)._ = _;
