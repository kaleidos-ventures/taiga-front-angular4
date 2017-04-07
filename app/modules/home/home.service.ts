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
 * File: home.service.coffee
 */

// import {groupBy} from "../../libs/utils"
// import * as angular from "angular"
// import * as _ from "lodash"
// import * as Immutable from "immutable"
//
// export class HomeService extends Service {
//     navurls:any
//     rs:any
//     projectsService:any
//
//     static initClass() {
//         this.$inject = [
//             "$tgNavUrls",
//             "tgResources",
//             "tgProjectsService"
//         ];
//     }
//
//     constructor(navurls, rs, projectsService) {
//         super()
//         this.navurls = navurls;
//         this.rs = rs;
//         this.projectsService = projectsService;
//     }
//
//     _attachProjectInfoToWorkInProgress(workInProgress, projectsById) {
//         let _duties;
//         let _attachProjectInfoToDuty = (duty, objType) => {
//             let project = projectsById.get(String(duty.get('project')));
//
//             let ctx = {
//                 project: project.get('slug'),
//                 ref: duty.get('ref')
//             };
//
//             let url = this.navurls.resolve(`project-${objType}-detail`, ctx);
//
//             duty = duty.set('url', url);
//             duty = duty.set('project', project);
//             duty = duty.set("_name", objType);
//
//             return duty;
//         };
//
//         let _getValidDutiesAndAttachProjectInfo = function(duties, dutyType){
//             // Exclude duties where I'm not member of the project
//             duties = duties.filter(duty => projectsById.get(String(duty.get('project'))));
//
//             duties = duties.map(duty => _attachProjectInfoToDuty(duty, dutyType));
//
//             return duties;
//         };
//
//         let assignedTo = workInProgress.get("assignedTo");
//
//         if (assignedTo.get("epics")) {
//             _duties = _getValidDutiesAndAttachProjectInfo(assignedTo.get("epics"), "epics");
//             assignedTo = assignedTo.set("epics", _duties);
//         }
//
//         if (assignedTo.get("userStories")) {
//             _duties = _getValidDutiesAndAttachProjectInfo(assignedTo.get("userStories"), "userstories");
//             assignedTo = assignedTo.set("userStories", _duties);
//         }
//
//         if (assignedTo.get("tasks")) {
//             _duties = _getValidDutiesAndAttachProjectInfo(assignedTo.get("tasks"), "tasks");
//             assignedTo = assignedTo.set("tasks", _duties);
//         }
//
//         if (assignedTo.get("issues")) {
//             _duties = _getValidDutiesAndAttachProjectInfo(assignedTo.get("issues"), "issues");
//             assignedTo = assignedTo.set("issues", _duties);
//         }
//
//
//         let watching = workInProgress.get("watching");
//
//         if (watching.get("epics")) {
//             _duties = _getValidDutiesAndAttachProjectInfo(watching.get("epics"), "epics");
//             watching = watching.set("epics", _duties);
//         }
//
//         if (watching.get("userStories")) {
//             _duties = _getValidDutiesAndAttachProjectInfo(watching.get("userStories"), "userstories");
//             watching = watching.set("userStories", _duties);
//         }
//
//         if (watching.get("tasks")) {
//             _duties = _getValidDutiesAndAttachProjectInfo(watching.get("tasks"), "tasks");
//             watching = watching.set("tasks", _duties);
//         }
//
//         if (watching.get("issues")) {
//             _duties = _getValidDutiesAndAttachProjectInfo(watching.get("issues"), "issues");
//             watching = watching.set("issues", _duties);
//         }
//
//         workInProgress = workInProgress.set("assignedTo", assignedTo);
//         return workInProgress = workInProgress.set("watching", watching);
//     }
//
//     getWorkInProgress(userId) {
//         let projectsById = Immutable.Map();
//
//         let projectsPromise = this.projectsService.getProjectsByUserId(userId).then(projects => projectsById = Immutable.fromJS(groupBy(projects.toJS(), p => p.id)));
//
//         let assignedTo = Immutable.Map();
//
//         let params_epics:any = {
//             status__is_closed: false,
//             assigned_to: userId
//         };
//
//         let params_uss:any = {
//             is_closed: false,
//             assigned_to: userId
//         };
//
//         let params_tasks:any = {
//             status__is_closed: false,
//             assigned_to: userId
//         };
//
//         let params_issues:any = {
//             status__is_closed: false,
//             assigned_to: userId
//         };
//
//         let assignedEpicsPromise = this.rs.epics.listInAllProjects(params_epics).then(epics => assignedTo = assignedTo.set("epics", epics));
//
//         let assignedUserStoriesPromise = this.rs.userstories.listInAllProjects(params_uss).then(userstories => assignedTo = assignedTo.set("userStories", userstories));
//
//         let assignedTasksPromise = this.rs.tasks.listInAllProjects(params_tasks).then(tasks => assignedTo = assignedTo.set("tasks", tasks));
//
//         let assignedIssuesPromise = this.rs.issues.listInAllProjects(params_issues).then(issues => assignedTo = assignedTo.set("issues", issues));
//
//         params_epics = {
//             status__is_closed: false,
//             watchers: userId
//         };
//
//         params_uss = {
//             is_closed: false,
//             watchers: userId
//         };
//
//         params_tasks = {
//             status__is_closed: false,
//             watchers: userId
//         };
//
//         params_issues = {
//             status__is_closed: false,
//             watchers: userId
//         };
//
//         let watching = Immutable.Map();
//
//         let watchingEpicsPromise = this.rs.epics.listInAllProjects(params_epics).then(epics => watching = watching.set("epics", epics));
//
//         let watchingUserStoriesPromise = this.rs.userstories.listInAllProjects(params_uss).then(userstories => watching = watching.set("userStories", userstories));
//
//         let watchingTasksPromise = this.rs.tasks.listInAllProjects(params_tasks).then(tasks => watching = watching.set("tasks", tasks));
//
//         let watchingIssuesPromise = this.rs.issues.listInAllProjects(params_issues).then(issues => watching = watching.set("issues", issues));
//
//         let workInProgress = Immutable.Map();
//
//         return Promise.all([
//             projectsPromise,
//             assignedEpicsPromise,
//             watchingEpicsPromise,
//             assignedUserStoriesPromise,
//             watchingUserStoriesPromise,
//             assignedTasksPromise,
//             watchingTasksPromise,
//             assignedIssuesPromise,
//             watchingIssuesPromise
//         ]).then(() => {
//             workInProgress = workInProgress.set("assignedTo", assignedTo);
//             workInProgress = workInProgress.set("watching", watching);
//
//             workInProgress = this._attachProjectInfoToWorkInProgress(workInProgress, projectsById);
//
//             return workInProgress;
//         });
//     }
// }
