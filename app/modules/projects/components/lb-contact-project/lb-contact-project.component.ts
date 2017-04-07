import {Component, Input} from "@angular/core";
import * as Immutable from "immutable";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import {ProjectContactAction} from "../../projects.actions";

@Component({
    selector: "tg-project-contact-lightbox",
    template: require("./lb-contact-project.pug"),
})
export class ProjectContactLightbox {
    @Input() project: Immutable.Map<string,any>;
    contactForm: FormGroup;

    constructor(private store: Store<IState>,
                private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            text: ["", Validators.required],
        })
    }

    contactProject() {
        if (this.contactForm.valid) {
            this.store.dispatch(new ProjectContactAction(this.project, this.contactForm.value.text))
        }
        return false;
    }
}
