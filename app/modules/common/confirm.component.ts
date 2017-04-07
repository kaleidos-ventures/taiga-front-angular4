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
 * File: modules/base/confirm.coffee
 */

import { Component, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as _ from "lodash";
import { IState } from "../../app.store";
import {addClass, cancelTimeout, debounce, timeout} from "../../libs/utils";
import { DiscardNotificationMessageAction } from "./common.actions";
import { Subscription } from "rxjs";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: "tg-notification-messages",
    template: `<div *ngIf="msg" [@state]="'active'" class="notification-message notification-message-{{msg.type}}" [class.active]="msg">
                 <div class="text">
                    <h4>{{msg.title || NOTIFICATION_MSG[msg.type].title | translate}}</h4>
                    <p>{{msg.message || NOTIFICATION_MSG[msg.type].message | translate}}</p>
                 </div>
                 <a
                    [title]="'NOTIFICATION.CLOSE' | translate"
                    (click)="closeNotification()"
                    class="close">
                   <tg-svg svg-icon="icon-close"></tg-svg>
                 </a>
               </div>`,
    animations: [
        trigger('state', [
            state('active', style({transform: 'translateY(0)', opacity: 1})),
            state('void', style({transform: 'translateY(-100%)', opacity: 0})),
            transition('void => *', [ animate(200) ]),
            transition('* => void', [ animate(200) ])
        ])
    ]
})
export class NotificationMessages implements OnDestroy {
    messages: any;
    currentState: any;
    msg: any;
    timeouts: any[];
    subscription: Subscription;
    NOTIFICATION_MSG = {
        "success": {
            title: "NOTIFICATION.OK",
            message: "NOTIFICATION.SAVED",
        },
        "error": {
            title: "NOTIFICATION.WARNING",
            message: "NOTIFICATION.WARNING_TEXT",
        },
        "light-error": {
            title: "NOTIFICATION.WARNING",
            message: "NOTIFICATION.WARNING_TEXT",
        },
    };

    constructor(private store: Store<IState>) {
        this.messages = this.store.select((state) => state.getIn(["common", "notification-messages"]));
        let subscription = this.messages.subscribe((state) => {
            this.currentState = state;
            if (!this.msg && this.currentState.size > 0) {
                this.msg = this.getNextMessage(state);
                let time = this.msg.time;
                if (!time) {
                    time = (this.msg.type === "error") || (this.msg.type === "light-error") ? 3500 : 1500;
                }
                time = 5000;
                // Render the remove of message before start the next message
                this.timeouts = [
                    timeout(time, () => {
                        this.msg = null;
                    }),
                    timeout(time+100, () => {
                        this.store.dispatch(new DiscardNotificationMessageAction());
                    }),
                ]
            }
        });
    }

    closeNotification() {
        for (let tout of this.timeouts) {
            cancelTimeout(tout);
        }
        this.msg = null;
        timeout(100, () => {
            this.store.dispatch(new DiscardNotificationMessageAction());
        });
    }

    getNextMessage(state) {
        if (this.currentState.size === 0) {
            return null;
        }
        return this.currentState.get(0);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

// export class ConfirmService extends Service {
//     q:any
//     lightboxService:any
//     loading:any
//     translate:any
//     tsem:any
//
//     static initClass() {
//         this.$inject = ["$q", "lightboxService", "$tgLoading", "$translate"];
//     }
//
//     constructor(q, lightboxService, loading, translate) {
//         super();
//         this.q = q;
//         this.lightboxService = lightboxService;
//         this.loading = loading;
//         this.translate = translate;
//         bindMethods(this);
//     }
//
//     hide(el){
//         if (el) {
//             this.lightboxService.close(el);
//
//             return el.off(".confirm-dialog");
//         }
//     }
//
//     ask(title, subtitle, message, lightboxSelector=".lightbox-generic-ask") {
//         let defered = this.q.defer();
//
//         let el = angular.element(lightboxSelector);
//
//         // Render content
//         if (title) { el.find(".title").text(title); }
//         if (subtitle) { el.find(".subtitle").text(subtitle); }
//         if (message) { el.find(".message").text(message); }
//
//         // Assign event handlers
//         el.on("click.confirm-dialog", ".button-green", debounce(2000, event => {
//             event.preventDefault();
//             let target = angular.element(event.currentTarget);
//             let currentLoading = this.loading()
//                 .target(target)
//                 .start();
//             return defered.resolve({
//                 finish: ok => {
//                     if (ok == null) { ok = true; }
//                     currentLoading.finish();
//                     if (ok) {
//                         return this.hide(el);
//                     }
//                 }
//             });
//     }));
//
//         el.on("click.confirm-dialog", ".button-red", event => {
//             event.preventDefault();
//             defered.reject();
//             return this.hide(el);
//         });
//
//         this.lightboxService.open(el);
//
//         return defered.promise;
//     }
//
//     askOnDelete(title, message) {
//         return this.ask(title, this.translate.instant("NOTIFICATION.ASK_DELETE"), message);
//     }
//
//     askChoice(title, subtitle, choices, replacement, warning, lightboxSelector) {
//         if (lightboxSelector == null) { lightboxSelector = ".lightbox-ask-choice"; }
//         let defered = this.q.defer();
//
//         let el = angular.element(lightboxSelector);
//
//         // Render content
//         el.find(".title").text(title);
//         el.find(".subtitle").text(subtitle);
//
//         if (replacement) {
//             el.find(".replacement").text(replacement);
//         } else {
//             el.find(".replacement").remove();
//         }
//
//         if (warning) {
//             el.find(".warning").text(warning);
//         } else {
//             el.find(".warning").remove();
//         }
//
//         let choicesField = el.find(".choices");
//         choicesField.html('');
//         _.each(choices, function(value, key) {
//             value = _.escape(value);
//             return choicesField.append(angular.element(`<option value='${key}'>${value}</option>`));
//         });
//
//         // Assign event handlers
//         el.on("click.confirm-dialog", "a.button-green", debounce(2000, event => {
//             event.preventDefault();
//             let target = angular.element(event.currentTarget);
//             let currentLoading = this.loading()
//                 .target(target)
//                 .start();
//             return defered.resolve({
//                 selected: choicesField.val(),
//                 finish: ok => {
//                     if (ok == null) { ok = true; }
//                     currentLoading.finish();
//                     if (ok) {
//                         return this.hide(el);
//                     }
//                 }
//             });
//     }));
//
//         el.on("click.confirm-dialog", ".button-red", event => {
//             event.preventDefault();
//             defered.reject();
//             return this.hide(el);
//         });
//
//         this.lightboxService.open(el);
//
//         return defered.promise;
//     }
//
//     error(message) {
//         let defered = this.q.defer();
//
//         let el = angular.element(".lightbox-generic-error");
//
//         // Render content
//         el.find(".title").html(message);
//
//         // Assign event handlers
//         el.on("click.confirm-dialog", ".button-green", event => {
//             event.preventDefault();
//             defered.resolve();
//             return this.hide(el);
//         });
//
//         el.on("click.confirm-dialog", ".close", event => {
//             event.preventDefault();
//             defered.resolve();
//             return this.hide(el);
//         });
//
//         this.lightboxService.open(el);
//
//         return defered.promise;
//     }
//
//     success(title, message, icon) {
//         let defered = this.q.defer();
//
//         let el = angular.element(".lightbox-generic-success");
//
//         el.find("img").remove();
//         el.find("svg").remove();
//
//         if (icon) {
//             let detailImage;
//             if (icon.type === "img") {
//                 detailImage = $('<img>').addClass('lb-icon').attr('src', icon.name);
//             } else if (icon.type === "svg") {
//                 detailImage = document.createElement("div");
//                 addClass(detailImage, "icon");
//                 addClass(detailImage, icon.name);
//                 addClass(detailImage, "lb-icon");
//
//                 let svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//
//                 let useSVG = document.createElementNS('http://www.w3.org/2000/svg', 'use');
//                 useSVG.setAttributeNS('http://www.w3.org/1999/xlink','href', `#${icon.name}`);
//
//                 detailImage.appendChild(svgContainer).appendChild(useSVG);
//             }
//
//             if (detailImage) {
//                 el.find('section').prepend(detailImage);
//             }
//         }
//
//         // Render content
//         if (title) { el.find(".title").html(title); }
//         if (message) { el.find(".message").html(message); }
//
//         // Assign event handlers
//         el.on("click.confirm-dialog", ".button-green", event => {
//             event.preventDefault();
//             defered.resolve();
//             return this.hide(el);
//         });
//
//         el.on("click.confirm-dialog", ".close", event => {
//             event.preventDefault();
//             defered.resolve();
//             return this.hide(el);
//         });
//
//         this.lightboxService.open(el);
//
//         return defered.promise;
//     }
//
//     loader(title, message, spin) {
//         if (spin == null) { spin = false; }
//         let el = angular.element(".lightbox-generic-loading");
//
//         // Render content
//         if (title) { el.find(".title").html(title); }
//         if (message) { el.find(".message").html(message); }
//
//         if (spin) {
//             el.find(".spin").removeClass("hidden");
//         }
//
//         return {
//             start: () => this.lightboxService.open(el),
//             stop: () => this.lightboxService.close(el),
//             update: (status, title, message, percent) => {
//                 if (title) { el.find(".title").html(title); }
//                 if (message) { el.find(".message").html(message); }
//
//                 if (percent) {
//                     el.find(".spin").addClass("hidden");
//                     el.find(".progress-bar-wrapper").removeClass("hidden");
//                     el.find(".progress-bar-wrapper > .bar").width(percent + '%');
//                     return el.find(".progress-bar-wrapper > span").html(percent + '%').css('left', (percent - 9) + '%' );
//                 } else {
//                     el.find(".spin").removeClass("hidden");
//                     return el.find(".progress-bar-wrapper").addClass("hidden");
//                 }
//             }
//         };
//     }
//
//     notify(type, message, title, time) {
//         // NOTE: Typesi are: error, success, light-error
//         //       See partials/components/notification-message.pug)
//         //       Add default texts to NOTIFICATION_MSG for new notification types
//
//         let selector = `.notification-message-${type}`;
//         let el = angular.element(selector);
//
//         if (el.hasClass("active")) { return; }
//
//         if (title) {
//             el.find("h4").html(title);
//         } else {
//             el.find("h4").html(this.translate.instant(NOTIFICATION_MSG[type].title));
//         }
//
//         if (message) {
//             el.find("p").html(message);
//         } else {
//             el.find("p").html(this.translate.instant(NOTIFICATION_MSG[type].message));
//         }
//
//         let body = angular.element("body");
//         body.find(".notification-message .notification-light")
//             .removeClass('active')
//             .addClass('inactive');
//
//         body.find(selector)
//             .removeClass('inactive')
//             .addClass('active');
//
//         if (this.tsem) {
//             cancelTimeout(this.tsem);
//         }
//
//         if (!time) {
//             time = (type === 'error') || (type === 'light-error') ? 3500 : 1500;
//         }
//
//         this.tsem = timeout(time, () => {
//             body.find(selector)
//                 .removeClass('active')
//                 .addClass('inactive')
//                 .one('animationend', function() { return $(this).removeClass('inactive'); });
//
//             return delete this.tsem;
//         });
//
//         return el.on("click", ".icon-close, .close", event => {
//             return body.find(selector)
//                 .removeClass('active')
//                 .addClass('inactive');
//         });
//     }
// }
// ConfirmService.initClass();
