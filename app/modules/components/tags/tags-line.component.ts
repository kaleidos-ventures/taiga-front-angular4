import {Component, Input, forwardRef, Output, EventEmitter} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    selector: "tg-tags-line",
    template: require("./tags-line.pug"),
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TagsLine),
        multi: true
      }
    ]
})
export class TagsLine implements ControlValueAccessor {
    @Input() disableColorSelection: boolean = false;
    @Input() canEdit: boolean;
    @Output() changed: EventEmitter<any[]>;
    addTag: boolean;
    _tags: any[];
    onChange: any;

    constructor() {
        this.changed = new EventEmitter();
    }

    set tags(val: any[]) {
        this._tags = val;
        if (this.onChange) {
            this.onChange(val);
        }
        this.changed.emit(val);
    }

    get tags() {
        return this._tags;
    }

    writeValue(value: any[]) {
        if (value) {
            this.tags = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched() {}

    removeTag(tag) {
        this.tags = _.filter(this._tags, (t) => t.name !== tag);
    }

    addNewTag(tag) {
        if (tag != "") {
            this.removeTag(tag.name);
            this.tags.push(tag);
        }
    }
}
