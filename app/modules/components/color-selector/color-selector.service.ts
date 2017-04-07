export const DEFAULT_COLOR = "#d3d7cf"
export const DEFAULT_COLOR_LIST = [
    "#fce94f", "#edd400", "#c4a000", "#8ae234", "#73d216", "#4e9a06", "#d3d7cf",
    "#fcaf3e", "#f57900", "#ce5c00", "#729fcf", "#3465a4", "#204a87", "#888a85",
    "#ad7fa8", "#75507b", "#5c3566", "#ef2929", "#cc0000", "#a40000", "#222222",
];

import {Injectable} from "@angular/core";
import * as _ from "lodash";

@Injectable()
export class ColorSelectorService {
    getRandom() {
        return _.sample(DEFAULT_COLOR_LIST);
    }

    getDefault() {
        return DEFAULT_COLOR;
    }

    getColorsList() {
        return _.clone(DEFAULT_COLOR_LIST);
    }
}
