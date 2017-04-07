import {Validator, FormControl} from "@angular/forms";

export function RegexValidator(regex, regexFlag="") {
    let final_regex = new RegExp(regex, regexFlag);
    return (c: FormControl): {[key: string]: any} => {
        if (c.value === "") {
            return {"regex": false};
        }
        return {"regex": !final_regex.test(c.value)};
    };
}

export function UsernameValidator(c: FormControl): {[key: string]: any} {
    let regex = new RegExp("^\\w[\\w.-]*$");
    if (c.value === "") {
        return null;
    }
    if (regex.test(c.value)) {
        return null;
    }
    return {"username": true};
}
