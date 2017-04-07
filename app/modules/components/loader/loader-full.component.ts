import {Component, Input} from "@angular/core";
import { Store } from "@ngrx/store";
import {Observable} from "rxjs";
import { IState } from "../../../app.store";

@Component({
    selector: "tg-loader-full",
    template: require("./loader-full.pug"),
})
export class LoaderFull {
    public isOpen: Observable<boolean>;

    constructor(private store: Store<IState>) {
        this.isOpen = this.store.select((state) => state.getIn(["global", "loading"]));
    }
}
