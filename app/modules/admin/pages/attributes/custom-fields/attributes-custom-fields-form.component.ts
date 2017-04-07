import {Component, Input, OnChanges, AfterViewChecked, ViewChild, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-admin-attributes-custom-fields-form",
    template: require("./attributes-custom-fields-form.pug"),
})
export class AdminAttributesCustomFieldsForm implements OnChanges, AfterViewChecked {
    @Input() value: Immutable.Map<string, any>;
    @Input() visible: boolean;
    @ViewChild('nameInput') nameInput;
    @Output() cancel: EventEmitter<number>;
    hasToFocus: boolean;

    constructor() {
        this.cancel = new EventEmitter();
    }

    ngOnChanges(changes) {
        if (changes.visible && !changes.visible.previousValue && changes.visible.currentValue) {
            this.hasToFocus = true;
        }
    }

    ngAfterViewChecked() {
        if (this.hasToFocus) {
            this.nameInput.nativeElement.focus();
            this.hasToFocus = false;
        }
    }
}
