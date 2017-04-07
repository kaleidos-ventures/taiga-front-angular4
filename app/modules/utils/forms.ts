import {FormGroup, FormControl} from "@angular/forms";
import * as _ from "lodash";

export function getDirtyValues(group: FormGroup) {
    let result = {}
    _.each(group.controls, (control, index) => {
        if (control instanceof FormControl && control.dirty) {
            result[index] = control.value
        }
    });
    return result;
}

export function setServerErrors(group: FormGroup, errors) {
    errors.forEach((value, key) => {
        group.controls[key].setErrors({server: value.toJS()});
    })
}
