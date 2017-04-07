import {Component, Input, OnChanges, Output, EventEmitter} from "@angular/core";
import * as Immutable from "immutable";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UniversalValidators } from "ngx-validators";
import {ColorSelectorService} from "../../components/color-selector/color-selector.service";

@Component({
    selector: "tg-create-epic-form",
    template: require("./create-epic-form.pug"),
})
export class CreateEpicForm implements OnChanges {
    @Input() statuses: Immutable.Map<string,any>;
    @Output() createEpic: EventEmitter<any>;
    createEpicForm: FormGroup;

    constructor(private fb: FormBuilder, private colorSelector: ColorSelectorService) {
        this.createEpic = new EventEmitter();
        this.createEpicForm = this.fb.group({
            color: [this.colorSelector.getRandom(), Validators.required],
            subject: ["", Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(140),
            ])],
            description: [""],
            tags: [[]],
            attachments: [[]],
            teamRequirement: [false],
            clientRequirement: [false],
            blocked: [false],
            blockedNote: [""],
            status: [null, Validators.required],
        });
    }

    ngOnChanges(changes) {
        if(this.statuses) {
            this.createEpicForm.controls.status.setValue(this.statuses.getIn([0, "id"]));
        }
    }

    onSubmit() {
        if (this.createEpicForm.valid) {
            this.createEpic.emit(this.createEpicForm.value);
        } else {
            this.createEpicForm.controls.subject.markAsDirty();
        }
        return false;
    }
}
