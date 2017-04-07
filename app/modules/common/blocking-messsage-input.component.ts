import {Component} from "@angular/core";

@Component({
    selector: "tg-blocking-message-input",
    template: `<fieldset class="blocked-note">
                  <input type="text"
                         name="blocked_note"
                         [placeholder]="'COMMON.BLOCKED_NOTE' | translate" />
               </fieldset>`,
})
export class BlockingMessageInput {}
