import {Component, Input} from "@angular/core";
import {FormControl } from '@angular/forms';


@Component({
    selector: "tg-field-error",
    template: require("./field-error.pug"),
})
export class FieldError {
    @Input() control: FormControl;
}
