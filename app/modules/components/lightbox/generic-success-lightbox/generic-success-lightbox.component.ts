import {Component, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import {CloseLightboxAction} from "../../../../app.actions";

@Component({
    host: {"class": "lightbox-generic-success"},
    selector: "tg-generic-success-lightbox",
    template: require("./generic-success-lightbox.pug"),
})
export class GenericSuccessLightbox {
    @Input() title: string;
    @Input() message: string;

    constructor(private store: Store<IState>) {}

    onAccept() {
        this.store.dispatch(new CloseLightboxAction());
    }
}
