import {ChangeDetectionStrategy, Component, Input, OnChanges, Output, EventEmitter} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import * as Immutable from "immutable";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UniversalValidators } from "ngx-validators";
import {ColorSelectorService} from "../../components/color-selector/color-selector.service";
import * as actions from "../backlog.actions";

@Component({
    selector: "tg-create-us-form",
    template: require("./create-us-form.pug"),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsForm implements OnChanges {
    @Input() project: Immutable.Map<string,any>;
    @Input() us: Immutable.Map<string,any>;
    createUsForm: FormGroup;

    constructor(private fb: FormBuilder, private store: Store<IState>) {
        this.createUsForm = this.fb.group({
            subject: ["", Validators.compose([
                Validators.required,
                UniversalValidators.maxLength(140),
            ])],
            points: [{}],
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
        if(this.us) {
            let tags = this.us.get('tags').map((tag) => ({name: tag.get(0), color: tag.get(1)})).toJS();
            this.createUsForm.controls.subject.setValue(this.us.get("subject"));
            this.createUsForm.controls.points.setValue(this.us.get("points").toJS());
            this.createUsForm.controls.description.setValue(this.us.get("description"));
            this.createUsForm.controls.tags.setValue(tags);
            this.createUsForm.controls.attachments.setValue(this.us.get("attachments"));
            this.createUsForm.controls.teamRequirement.setValue(this.us.get("team_requirement"));
            this.createUsForm.controls.clientRequirement.setValue(this.us.get("client_requirement"));
            this.createUsForm.controls.blocked.setValue(this.us.get("blocked"));
            this.createUsForm.controls.blockedNote.setValue(this.us.get("blockedNote"));
            this.createUsForm.controls.status.setValue(this.us.get("status"));
        } else {
            this.createUsForm.controls.subject.setValue("");
            this.createUsForm.controls.points.setValue({});
            this.createUsForm.controls.description.setValue("");
            this.createUsForm.controls.tags.setValue([]);
            this.createUsForm.controls.attachments.setValue([]);
            this.createUsForm.controls.teamRequirement.setValue(false);
            this.createUsForm.controls.clientRequirement.setValue(false);
            this.createUsForm.controls.blocked.setValue(false);
            this.createUsForm.controls.blockedNote.setValue("");
            if (this.project) {
                this.createUsForm.controls.status.setValue(this.project.getIn(["us_statuses", 0, "id"]));
            }
        }
    }

    onSubmit() {
        if (this.createUsForm.valid) {
            let data = this.createUsForm.value;
            data.project = this.project.get('id');
            data.team_requirement = data.teamRequirement;
            data.client_requirement = data.clientRequirement;
            data.blocked_note = data.blockedNote;
            if (this.us) {
                this.store.dispatch(new actions.UpdateUserStoryAction(this.us, data));
            } else {
                this.store.dispatch(new actions.CreateUserStoryAction(data));
            }
        } else {
            this.createUsForm.controls.subject.markAsDirty();
        }
        return false;
    }
}
