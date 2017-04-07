import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-tags-add-input",
    template: require("./tags-add-input.pug"),
})
export class TagsAddInput {
    @Input() field: Immutable.Map<string,any>;
    @Input() disableColorSelection: boolean;
    @Output() add: EventEmitter<any>;
    newTag: any = {name: "", color: ""};
    colorArray: string[];

    constructor() {
        this.add = new EventEmitter();
    }

    setName(event) {
        this.newTag.name = event.target.value;
        if (event.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault();
            this.addTag();
            return false;
        }
    }

    addTag() {
        this.add.emit({name: this.newTag.name, color: this.newTag.color});
        this.newTag.name = "";
        this.newTag.color = null;
    }
}
