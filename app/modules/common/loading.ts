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
 * File: modules/lightboxes.coffee
 */

// declare var _version:string;
// import {Directive, OnChanges, TemplateRef, ViewContainerRef, Input} from "@angular/core"
//
// @Directive({
//     selector: '[*tgLoading]'
// })
// export class Loading implements OnChanges{
//     @Input("*tgLoading") loading: boolean;
//     private spinner = `<img class='loading-spinner' src='/${_version}/svg/spinner-circle.svg' alt='loading...' />`;
//
//     constructor(private templateRef: TemplateRef<any>,
//                 private viewContainer: ViewContainerRef) { }
//
//     ngOnChanges() {
//         if (this.loading) {
//             this.viewContainer.createEmbeddedView(this.templateRef)
//         } else {
//             this.viewContainer.createEmbeddedView(this.spinner)
//         }
//     }
// }

// export let TgLoadingService = function($compile) {
//
//     return function() {
//         var service = {
//             settings: {
//                 target: null,
//                 scope: null,
//                 classes: [],
//                 timeout: 0,
//                 template: null,
//                 timeoutId: null
//             },
//             target(target) {
//                 service.settings.target = target;
//
//                 return service;
//             },
//             scope(scope) {
//                 service.settings.scope = scope;
//
//                 return service;
//             },
//             template(template) {
//                 service.settings.template = template;
//
//                 return service;
//             },
//             removeClasses(...classess) {
//                 service.settings.classes = classess;
//
//                 return service;
//             },
//             timeout(timeout) {
//                 service.settings.timeout = timeout;
//
//                 return service;
//             },
//
//             start() {
//                 let { target } = service.settings;
//
//                 service.settings.classes.map(className => target.removeClass(className));
//
//                 if (!target.hasClass('loading') && !service.settings.template) {
//                     service.settings.template = target.html();
//                 }
//
//                 // The loader is shown after that quantity of milliseconds
//                 let timeoutId = setTimeout((function() {
//                     if (!target.hasClass('loading')) {
//                         target.addClass('loading');
//
//                         return target.html(spinner);
//                     }
//                     }), service.settings.timeout);
//
//                 service.settings.timeoutId = timeoutId;
//
//                 return service;
//             },
//
//             finish() {
//                 let { target } = service.settings;
//                 let { timeoutId } = service.settings;
//
//                 if (timeoutId) {
//                     clearTimeout(timeoutId);
//
//                     let removeClasses = service.settings.classes;
//                     removeClasses.map(className => service.settings.target.addClass(className));
//
//                     target.html(service.settings.template);
//                     target.removeClass('loading');
//
//                     if (service.settings.scope) {
//                         $compile(target.contents())(service.settings.scope);
//                     }
//                 }
//
//                 return service;
//             }
//         };
//
//         return service;
//     };
// };
// TgLoadingService.$inject = ["$compile"];
//
// export let LoadingDirective = function($loading) {
//     let link = function($scope, $el, attr) {
//         let currentLoading = null;
//         let template = $el.html();
//
//         return $scope.$watch(attr.tgLoading, showLoading => {
//
//             if (showLoading) {
//                 return currentLoading = $loading()
//                     .target($el)
//                     .timeout(100)
//                     .template(template)
//                     .scope($scope)
//                     .start();
//              } else if (currentLoading) {
//                  return currentLoading.finish();
//              }
//         });
//     };
//
//     return {
//         priority: 99999,
//         link
//     };
// };
