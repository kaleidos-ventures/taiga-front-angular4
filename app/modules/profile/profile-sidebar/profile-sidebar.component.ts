import {Component, Input, OnInit} from "@angular/core";
import * as Immutable from "immutable";

@Component({
    selector: "tg-profile-sidebar",
    template: require("./profile-sidebar.pug"),
})
export class ProfileSidebar implements OnInit {
    @Input() isCurrentUser: boolean;
    HINTS: any[] = [
        {
            url: "https://tree.taiga.io/support/admin/import-export-projects/",
            linkText: "HINTS.LINK",
            title: "HINTS.HINT1_TITLE",
            text: "HINTS.HINT1_TEXT",
        },
        {
            url: "https://tree.taiga.io/support/admin/custom-fields/",
            linkText: "HINTS.LINK",
            title: "HINTS.HINT2_TITLE",
            text: "HINTS.HINT2_TEXT",
        },
        {
            linkText: "HINTS.LINK",
            title: "HINTS.HINT3_TITLE",
            text: "HINTS.HINT3_TEXT",
        },
        {
            linkText: "HINTS.LINK",
            title: "HINTS.HINT4_TITLE",
            text: "HINTS.HINT4_TEXT",
        },
    ];
    hint: any;

    ngOnInit() {
        const hintKey = Math.floor(Math.random() * this.HINTS.length) + 1;
        this.hint = this.HINTS[hintKey - 1];
    }
}
