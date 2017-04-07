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
 * File: modules/components/wysiwyg/wysiwyg-code-hightlighter.service.coffee
 */

import {Injectable} from "@angular/core";
import * as Promise from "bluebird";
import * as _ from "lodash";

@Injectable()
export class WysiwygCodeHightlighterService {
    languages: any;
    loadPromise: any;

    constructor() {
        Prism.plugins.customClass.prefix("prism-");
        Prism.plugins.customClass.map({});
    }

    getLanguages() {
        // TODO: Convert it to use a ngrx
        return new Promise((resolve, reject) => {
            if (this.languages) {
                return resolve(this.languages);
            } else if (this.loadPromise) {
                return this.loadPromise.then(() => resolve(this.languages));
            } else {
                return this.loadPromise = $.getJSON(`/${_version}/prism/prism-languages.json`).then((_languages_) => {
                    this.loadPromise = null;
                    this.languages = _.map(_languages_, function(it: any) {
                        it.url = `/${_version}/prism/` + it.file;

                        return it;
                    });

                    return resolve(this.languages);
                });
            }
        });
    }

    getLanguageInClassList(classes) {
        const lan = _.find(this.languages, (it: any) =>
            !!_.find(classes, (className) => (`language-${it.name}`) === className),
        );

        return lan ? lan.name : null;
    }

    loadLanguage(lan) {
        // TODO: Convert it to use a ngrx
        return new Promise(function(resolve) {
            if (!Prism.languages[lan]) {
                return ljs.load(`/${_version}/prism/prism-${lan}.min.js`, resolve);
            } else {
                return resolve();
            }
        });
    }

    // firefox adds br instead of new lines inside <code>
    replaceCodeBrToNl(code) {
        return $(code).find("br").replaceWith("\n");
    }

    hightlightCode(code) {
        this.replaceCodeBrToNl(code);

        const lan = this.getLanguageInClassList(code.classList);

        if (lan) {
            return this.loadLanguage(lan).then(() => Prism.highlightElement(code));
        }
    }

    addHightlighter(element) {
        const codes = $(element).find("code");

        return codes.each((index, code) => {
            this.hightlightCode(code);
            return true;
        });
    }
}
