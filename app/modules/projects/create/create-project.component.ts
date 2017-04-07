import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    animations: [
      trigger('display', [
        state('visible', style({height: '*'})),
        state('hidden', style({height: 0})),
        transition('hidden => visible', animate('100ms ease-in')),
        transition('visible => hidden', animate('100ms ease-in')),
      ])
    ],
    selector: "tg-create-project-page",
    template: require("./create-project.pug"),
})
export class CreateProjectPage {
    displayScrumDesc: string = "hidden";
    displayKanbanDesc: string = "hidden";

    toggleKanbanHelp(event) {
        event.stopPropagation();
        if(this.displayKanbanDesc === "visible") {
            this.displayKanbanDesc = "hidden"
        } else {
            this.displayKanbanDesc = "visible"
        }
        return false;
    }

    toggleScrumHelp(event) {
        event.stopPropagation();
        if(this.displayScrumDesc === "visible") {
            this.displayScrumDesc = "hidden"
        } else {
            this.displayScrumDesc = "visible"
        }
        return false;
    }
}
