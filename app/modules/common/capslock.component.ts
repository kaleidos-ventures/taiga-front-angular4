import {Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "tg-capslock",
    template: `<tg-svg
                  class="capslock"
                  *ngIf="active"
                  svg-icon='icon-capslock'
                  svg-title='COMMON.CAPSLOCK_WARNING'></tg-svg>`,
})
export class Capslock {
    active: boolean = false;

    constructor() {
        document.addEventListener("keypress", (e) => {
            this.active = this._isCapsLock(e);
        });
    }

    _isCapsLock(e): boolean {
		e = (e) ? e : window.event;

		let charCode = null;
		if (e.which) {
			charCode = e.which;
		} else if (e.keyCode) {
			charCode = e.keyCode;
		}

		let shifton = false;
		if (e.shiftKey) {
			shifton = e.shiftKey;
		} else if (e.modifiers) {
			shifton = !!(e.modifiers & 4);
		}

		if (charCode >= 97 && charCode <= 122 && shifton) {
			return true;
		}

		if (charCode >= 65 && charCode <= 90 && !shifton) {
			return true;
		}

		return false;
    }
}
