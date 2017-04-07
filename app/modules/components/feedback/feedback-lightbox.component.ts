import {Component, Output, EventEmitter} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    host: {"class": "lightbox-feedback lightbox-generic-form"},
    selector: "tg-feedback-lightbox",
    template: require("./feedback-lightbox.pug"),
})
export class FeedbackLightbox {
    @Output() feedback: EventEmitter<string>;
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.feedback = new EventEmitter();
        this.form = this.fb.group({comment: ['', Validators.required]});
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.form.valid) {
            this.feedback.emit(this.form.value.comment);
        }
    }
}
