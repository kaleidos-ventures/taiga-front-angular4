/*
 * Copyright (C) 2014-2015 Taiga Agile LLC <taiga@taiga.io>
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
 * File: project-logo.service.coffee
 */

import {murmurhash3_32_gc} from "../../libs/murmurhash3_gc";
import {cartesianProduct} from "../../libs/utils";
declare var _version: string;
import {Injectable} from "@angular/core";

@Injectable()
export class ProjectLogoService {
    logos: any;

    constructor() {
        const IMAGES = [
            `/${_version}/images/project-logos/project-logo-01.png`,
            `/${_version}/images/project-logos/project-logo-02.png`,
            `/${_version}/images/project-logos/project-logo-03.png`,
            `/${_version}/images/project-logos/project-logo-04.png`,
            `/${_version}/images/project-logos/project-logo-05.png`,
        ];

        const COLORS = [
            "rgba( 153,  214, 220, 1 )",
            "rgba( 213,  156,  156, 1 )",
            "rgba( 214, 161, 212,  1 )",
            "rgba( 164, 162, 219, 1 )",
            "rgba( 152, 224, 168,  1 )",
        ];

        this.logos = cartesianProduct(IMAGES, COLORS);
    }

    getDefaultProjectLogo(slug, id) {
        const key = `${slug}-${id}`;
        const idx = __mod__(murmurhash3_32_gc(key, 42), this.logos.length);
        const logo = this.logos[idx];

        return { src: logo[0], color: logo[1] };
    }
}

function __mod__(a, b) {
  a = +a;
  b = +b;
  return (a % b + b) % b;
}
