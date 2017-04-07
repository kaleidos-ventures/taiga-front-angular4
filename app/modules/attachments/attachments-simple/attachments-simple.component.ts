import {Component, Input, forwardRef, Output, EventEmitter} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as Immutable from "immutable";

@Component({
    selector: "tg-attachments-simple",
    template: require("./attachments-simple.pug"),
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AttachmentsSimple),
        multi: true
      }
    ]
})
export class AttachmentsSimple implements ControlValueAccessor {
    @Output() modified: EventEmitter<any>;
    _attachments: any[];
    onChange: any;

    constructor() {
        this.modified = new EventEmitter();
    }

    writeValue(value: any[]) {
        if (value !== undefined) {
            this.attachments = value;
        }
    }

    get attachments() {
        return this._attachments;
    }

    set attachments(val) {
        this._attachments = val;
        if (this.onChange) {
            this.onChange(val);
        }
        this.modified.emit(val);
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched() {}

    onChangeFile(event) {
        this.attachments = this.attachments.concat(Array.from(event.target.files));
    }

    deleteAttachment(idx: number) {
        this.attachments.splice(idx, 1);
    }
}
