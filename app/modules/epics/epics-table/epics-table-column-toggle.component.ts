import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    host: {"class": "fieldset"},
    selector: "tg-epics-table-column-toggle",
    template: require("./epics-table-column-toggle.pug"),
})
export class EpicsTableColumnToggle {
    @Input() title: string;
    @Input() id: string;
    @Input() value: boolean;
    @Output() valueChange: EventEmitter<boolean>;

    constructor() {
        this.valueChange = new EventEmitter();
    }
}
