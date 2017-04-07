import {Component, Input} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-detail-custom-attributes-value",
    template: require("./detail-custom-attributes-value.pug"),
})
export class DetailCustomAttributesValue {
    @Input() attr: Immutable.Map<string,any>;
    @Input() value: any;
    @Input() canEdit: boolean;
    prettyDate: string;
    editing: boolean = false;

    constructor(private translate: TranslateService) {
        this.prettyDate = this.translate.instant("COMMON.PICKERDATE.FORMAT");
    }
}
