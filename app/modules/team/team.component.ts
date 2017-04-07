/*
 * Copyright (C) 2014-2017 Andrey Antukh <niwi@niwi.nz>
 * Copyright (C) 2014-2017 Jesús Espino Garcia <jespinog@gmail.com>
 * Copyright (C) 2014-2017 David Barragán Merino <bameda@dbarragan.com>
 * Copyright (C) 2014-2017 Alejandro Alonso <alejandro.alonso@kaleidos.net>
 * Copyright (C) 2014-2017 Juan Francisco Alcántara <juanfran.alcantara@kaleidos.net>
 * Copyright (C) 2014-2017 Xavi Julian <xavier.julian@kaleidos.net>
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
 * File: modules/team/main.coffee
 */

import {Component, OnInit, OnDestroy, OnChanges} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../app.store";
import {StartLoadingAction, StopLoadingAction} from "../../app.actions";
import {Observable, Subscription} from "rxjs";
import * as Immutable from "immutable";
import * as actions from "./team.actions";

//############################################################################
//# Team Controller
//############################################################################

@Component({
    template: require("./team.pug"),
})
export class TeamPage implements OnInit, OnDestroy {
    project: Observable<Immutable.Map<string, any>>;
    user: Observable<Immutable.Map<string, any>>;
    stats: Observable<Immutable.Map<string, any>>;
    memberships: Observable<Immutable.List<any>>;
    filtersRole: Immutable.Map<string, any> = null;
    filtersQ: string = "";
    subscription: Subscription;

    constructor(private store: Store<IState>) {
        this.store.dispatch(new StartLoadingAction());
        this.project = this.store.select((state) => state.getIn(['projects', 'current-project']));
        this.user = this.store.select((state) => state.getIn(['auth', 'user']));
        this.stats = this.store.select((state) => state.getIn(['team', 'stats']))
                               .filter((stats) => stats !== null)
                               .do(() => this.store.dispatch(new StopLoadingAction()))
                               .map((stats) => {
                                   let limits = stats.map((entry) => {
                                       return Immutable.fromJS({max: entry.max(), min: entry.min()})
                                   });

                                   let totals = stats.reduce((acc, entry) => {
                                       if (acc === null) {
                                           return entry;
                                       }
                                       return acc.map((tot, key) => {
                                           return tot + entry.get(key)
                                       })
                                   }, null)
                                   return stats.map((entry, key) => {
                                           return entry.map((value) => {
                                               if (limits.getIn([key, 'min']) === limits.getIn([key, 'max'])) {
                                                   return 0.1
                                               } else if (value === limits.getIn([key, 'max'])) {
                                                   return 1
                                               } else if (value === limits.getIn([key, 'min'])) {
                                                   return 0.1
                                               } else {
                                                   return (value * 0.5) / limits.getIn([key, 'max'])
                                               }
                                       });
                                   }).set('totals', totals);
                               });
        this.memberships = this.store.select((state) => state.getIn(['projects', 'current-project', 'members']))
                                     .combineLatest(this.user)
                                     .map(([memberships, user]) => {
                                         // REMOVE CURRENT USER
                                         if (memberships && user) {
                                             return memberships.filter((member) => member.get('id') !== user.get('id')).toList();
                                         }
                                         return memberships;
                                     });
    }


    ngOnInit() {
        this.subscription = this.project.subscribe((project) => {
            if (project !== null) {
                this.store.dispatch(new actions.FetchTeamStatsAction(project.get('id')))
            }
        })
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(new actions.CleanTeamDataAction())
    }

}
