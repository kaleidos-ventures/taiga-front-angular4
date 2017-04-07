/*
 * Copyright (C) 2014-2017 Taiga Agile LLC <taiga@taiga.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: create-project-form.component.ts
 */

import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import * as Immutable from "immutable";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { CreateProjectAction, DuplicateProjectAction, FetchDuplicateBaseProjectMembershipsAction} from "../../projects.actions";
import * as _ from "lodash";

@Component({
    template: require("./create-project-form.pug"),
})
export class CreateProjectFormPage implements OnInit, OnDestroy{
    projects: Observable<Immutable.List<any>>;
    members: Observable<Immutable.List<any>>;
    user: Observable<Immutable.Map<string, any>>;
    canCreatePrivateProjects: Observable<any>;
    canCreatePublicProjects: Observable<any>;
    type: string;
    projectForm: FormGroup;
    invitedMembers: any = {};
    subscription: Subscription;

    constructor(private store: Store<IState>,
                private route: ActivatedRoute,
                private fb: FormBuilder) {
        this.projects = this.store.select((state) => state.getIn(["projects", "user-projects"]));
        this.user = this.store.select((state) => state.getIn(["auth", "user"]));

        const allMembers = this.store.select((state) => state.getIn(["projects", "create", "base-project-memberships"]));
        this.members = allMembers.combineLatest(this.user)
                                 .map(([members, user]) => {
                                     return members.filter((member) => member.get('user') && member.get('user') !== user.get('id'));
                                 });
        this.canCreatePrivateProjects = this.user.map((user) => {
                                                     const valid = user.get('max_private_projects') >= user.get('total_private_projects');
                                                     let reason = null;
                                                     if (!valid) {
                                                         reason = "max_private_projects";
                                                     }
                                                     return {
                                                         valid: valid,
                                                         reason: reason
                                                     }
                                                 });
        this.canCreatePublicProjects = this.user.map((user) => {
                                                     const valid = user.get('max_public_projects') >= user.get('total_public_projects');
                                                     let reason = null;
                                                     if (!valid) {
                                                         reason = "max_public_projects";
                                                     }
                                                     return {
                                                         valid: valid,
                                                         reason: reason
                                                     }
                                                 });
    }

    onSubmit() {
        if (this.projectForm.valid) {
            const name = this.projectForm.value.name.value;
            const description = this.projectForm.value.description.value;
            const privacy = this.projectForm.value.privacy.value;
            if (this.type == "duplicate") {
                const baseProject = this.projectForm.value.project.value;
                const invitedMembers = _.reduce(this.invitedMembers, (acc, value, key) => value ? acc.concat([key]) : acc, []);
                this.store.dispatch(new DuplicateProjectAction(baseProject, name, description, privacy, invitedMembers))
            } else {
                this.store.dispatch(new CreateProjectAction(this.type, name, description, privacy))
            }
        }
    }

    onProjectChange(projectSlug) {
        this.store.dispatch(new FetchDuplicateBaseProjectMembershipsAction(projectSlug));
    }

    ngOnInit() {
        this.route.params.first().subscribe((params) => {
            this.type = params.type;
            this.projectForm = this.fb.group({
                name: this.fb.group({value: ["", Validators.required]}),
                description: this.fb.group({value: ["", Validators.required]}),
                privacy: this.fb.group({value: false}),
            })
            if (this.type === "duplicate") {
                this.projectForm.controls.project = this.fb.group({value: ["", Validators.required]});
            }
        });
        this.subscription = this.members.subscribe((members) => {
            this.invitedMembers = members.reduce((acc, member) => acc.set(member.get('user'), true), Immutable.Map()).toJS()
        })
    }

    toggleInvitedMember(memberId) {
        this.invitedMembers[memberId] = !this.invitedMembers[memberId];
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
