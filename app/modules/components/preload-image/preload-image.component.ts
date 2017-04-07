import {Component, Input, OnChanges} from "@angular/core";

@Component({
    selector: "tg-preload-image",
    template: `<div>
                  <img *ngIf="!loaded" class='loading-spinner' src='/#{_version}/svg/spinner-circle.svg' alt='loading...' />
                  <ng-content *ngIf="loaded"></ng-content>
               </div>`,
})
export class PreloadImage implements OnChanges {
    @Input() src: string;
    loaded: boolean;

    ngOnChanges(changes) {
        if (changes.src && this.src) {
            this.loaded = false;
            const image = new Image();
            image.onload = () => this.loaded = true;
            image.src = this.src
        }
    }
}
