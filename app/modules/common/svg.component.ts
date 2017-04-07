import {Component, ElementRef, Input} from "@angular/core";

@Component({
    selector: "tg-svg",
    template: `
      <svg [ngClass]="['icon', svgIcon]">
          <use [attr.xlink:href]="'#' + svgIcon">
              <title *ngIf="svgTitle">{{svgTitle}}</title>
              <title *ngIf="svgTitleTranslate" i18n>{{svgTitleTranslate}}</title>
          </use>
      </svg>
    `,
})
export class Svg {
    @Input("svg-icon") svgIcon: string = "";
    @Input("svg-title") svgTitle: string = "";
    @Input("svg-title-translate") svgTitleTranslate: string = "";

    constructor(elm: ElementRef) {
        this.svgIcon = elm.nativeElement.getAttribute("svg-icon");
        this.svgTitle = elm.nativeElement.getAttribute("svg-title");
        this.svgTitleTranslate = elm.nativeElement.getAttribute("svg-title-translate");
    }
}
