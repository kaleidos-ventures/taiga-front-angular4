import {Component, Input} from "@angular/core";

@Component({
    selector: "tg-user-display",
    template: require("./user-display.pug")
})
export class UserDisplay {
    @Input() user;
}
