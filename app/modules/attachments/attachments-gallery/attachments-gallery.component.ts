import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-attachments-gallery",
    template: require("./attachments-gallery.pug"),
})
export class AttachmentsGallery {
    @Input() attachments: Immutable.List<any>;
    @Input() uploadingAttachments: Immutable.List<any>;
    @Input() isDeprecatedVisible: boolean = false;
    @Output() delete: EventEmitter<number>;
    @Output() preview: EventEmitter<any>;
    visibleAttachments: Immutable.List<any>;

    constructor() {
        this.delete = new EventEmitter();
        this.preview = new EventEmitter();
    }

    ngOnChanges() {
        if(this.isDeprecatedVisible) {
            this.visibleAttachments = this.attachments;
        } else {
            this.visibleAttachments = this.attachments.filter((att) => !att.get('is_deprecated')).toList();
        }
    }
}
