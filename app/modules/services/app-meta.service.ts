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
 * File: app-meta.service.coffee
 */

import {truncate} from "../../libs/utils";
import {Observable} from "rxjs";

import {Injectable} from "@angular/core";

@Injectable()
export class AppMetaService {
    // TODO: Needed when implemented the last function
    // listener:any
    // _listener:any

    _set(key, value) {
        let meta;
        if (!key) { return; }

        if (key === "title") {
            meta = $("head title");

            if (meta.length === 0) {
                meta = $("<title></title>");
                $("head").append(meta);
            }

            return meta.text(value || "");
        } else if (key.indexOf("og:") === 0) {
            meta = $(`head meta[property='${key}']`);

            if (meta.length === 0) {
                meta = $(`<meta property='${key}'/>`);
                $("head").append(meta);
            }

            return meta.attr("content", value || "");
        } else {
            meta = $(`head meta[name='${key}']`);

            if (meta.length === 0) {
                meta = $(`<meta name='${key}'/>`);
                $("head").append(meta);
            }

            return meta.attr("content", value || "");
        }
    }

    setTitle(title) {
        return this._set("title", title);
    }

    setDescription(description) {
        return this._set("description", truncate(description, 250));
    }

    setTwitterMetas(title, description) {
        this._set("twitter:card", "summary");
        this._set("twitter:site", "@taigaio");
        this._set("twitter:title", title);
        this._set("twitter:description", truncate(description, 300));
        return this._set("twitter:image", `${window.location.origin}/${_version}/images/logo-color.png`);
    }

    setOpenGraphMetas(title, description) {
        this._set("og:type", "object");
        this._set("og:site_name", "Taiga - Love your projects");
        this._set("og:title", title);
        this._set("og:description", truncate(description, 300));
        this._set("og:image", `${window.location.origin}/${_version}/images/logo-color.png`);
        this._set("og:url", window.location.href);
    }

    setAll(title, description) {
        this.setTitle(title);
        this.setDescription(description);
        this.setTwitterMetas(title, description);
        this.setOpenGraphMetas(title, description);
    }

    setAsync(title, description) {
        Observable.zip(title, description).take(1).subscribe(([title, description]: any) => {
            this.setTitle(title);
            this.setDescription(description);
            this.setTwitterMetas(title, description);
            this.setOpenGraphMetas(title, description);
        })
    }

    addMobileViewport() {
        return $("head").append(
            `<meta name=\"viewport\" \
content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0\">`,
        );
    }

    removeMobileViewport() {
        return $("head meta[name=\"viewport\"]").remove();
    }

    // TODO: Implement in the future when needed
    // setfn(fn) {
    //     if (this.listener) { this._listener(); }
    //
    //     return this._listener = this.rootScope.$watchCollection(fn, (metas:any) => {
    //         if (metas) {
    //             this.setAll(metas.title, metas.description);
    //             return this._listener();
    //         }
    //     });
    // }
}
