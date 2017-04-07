import {ChangeDetectionStrategy, Component, Input, OnChanges, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-filter-save-custom",
    template: require("./filter-save-custom.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSaveCustom implements OnChanges {
    @Input() appliedFilters: Immutable.List<any>;
    @Output() saveCustomFilter: EventEmitter<string>
    customFilterForm:boolean = false;
    customFilterName:string = "";

    constructor() {
        this.saveCustomFilter = new EventEmitter();
    }

    ngOnChanges(changes) {
        if (changes.appliedFilters) {
            this.customFilterForm = false;
            this.customFilterName = "";
        }
    }

    saveFilter(filterName) {
        this.customFilterForm = false;
        this.customFilterName = "";
        this.saveCustomFilter.emit(filterName);
    }
}
