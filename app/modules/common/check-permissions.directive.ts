import {Directive, ElementRef, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";

@Directive({
    selector: "[tg-check-permission]",
})
export class CheckPermission {
    @Input("tg-check-permission") permission;
    private myPermissions = [];

    constructor(private store: Store<IState>, private el: ElementRef) {
        $(this.el.nativeElement).addClass("hidden");
        this.store.select((state) => state.getIn(["projects", "current-project"])).subscribe((project) => {
            if (project) {
                this.myPermissions = project.get("my_permissions").toJS();
            } else {
                this.myPermissions = [];
            }
        });
    }

    ngOnChanges() {
        if (this.myPermissions && this.permission) {
            if (this.myPermissions.indexOf(this.permission) > -1) {
                $(this.el.nativeElement).removeClass("hidden");
            } else {
                $(this.el.nativeElement).addClass("hidden");
            }
        }
    }
}
