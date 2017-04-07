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
 * File: joy-ride.directive.coffee
 */

import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {introJs} from "intro.js";
import {TranslateService} from "@ngx-translate/core";
import {CurrentUserService} from "../../services/current-user.service";
import {Store} from "@ngrx/store";
import {IState} from "../../../app.store";
import {PutJoyrideEnableAction} from "../../../app.actions";
import {Observable, Subscription} from "rxjs";

import * as Immutable from "immutable";
import * as _ from "lodash";

@Component({
    selector: "tg-joy-ride",
    template: "",
})
export class JoyRide implements OnInit, OnDestroy {
    joyride: Observable<Immutable.Map<string, any>>;
    subscription: Subscription;
    private intro: any;

    constructor(private translate: TranslateService, private store: Store<IState>) {
        this.joyride = this.store.select((state) => state.getIn(['global', 'joyride']));
    }

    ngOnInit() {
        this.intro = introJs();

        this.subscription = this.joyride.subscribe((joyride) => {
            if (joyride && joyride.get('key') && joyride.getIn(["enabled", joyride.get('key')]) !== false) {
                this.intro.onexit(() => {
                    let enabled = joyride.get('enabled').set(joyride.get('key'), false);
                    this.store.dispatch(new PutJoyrideEnableAction(enabled))
                });
                this.intro.oncomplete(() => {
                    $("html,body").scrollTop(0);
                    let enabled = joyride.get('enabled').set(joyride.get('key'), false);
                    this.store.dispatch(new PutJoyrideEnableAction(enabled))
                });
                this.intro.setOptions({
                    exitOnEsc: false,
                    exitOnOverlayClick: false,
                    showStepNumbers: false,
                    nextLabel: this.translate.instant("JOYRIDE.NAV.NEXT") + " &rarr;",
                    prevLabel: `&larr; ${this.translate.instant("JOYRIDE.NAV.BACK")}`,
                    skipLabel: this.translate.instant("JOYRIDE.NAV.SKIP"),
                    doneLabel: this.translate.instant("JOYRIDE.NAV.DONE"),
                    disableInteraction: true,
                });

                this.intro.addSteps(this.loadSteps(joyride.get('steps').toJS()));
                this.intro.running = true;
                this.intro.start();
            } else {
                this.exitIntro();
            }
        })
    }

    loadSteps(steps) {
        return steps.map((step) => {
            let newStep = _.clone(step);
            newStep.intro = ""
            if (step.joyride.title) {
                newStep.intro += `<h3>${this.translate.instant(step.joyride.title)}</h3>`;
            }

            if (_.isArray(step.joyride.text)) {
                for (let t of step.joyride.text) {
                    newStep.intro += `<p>${this.translate.instant(t)}</p>`
                }
            } else {
                newStep.intro += `<p>${this.translate.instant(step.joyride.text)}</p>`;
            }
            return newStep;
        })
    }

    exitIntro() {
        if (this.intro.running) {
            this.intro.running = false;
            this.intro.exit();
        }
    }

    ngOnDestroy() {
        this.exitIntro();
        this.subscription.unsubscribe();
    }
}
