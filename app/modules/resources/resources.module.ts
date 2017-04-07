import {NgModule} from "@angular/core";

import {CustomAttributesResource} from "./custom-attributes-resource.service";
import {CustomAttributesValuesResource} from "./custom-attributes-values-resource.service";
import {HistoryResource} from "./history-resource.service";
import {InvitationsResource} from "./invitations-resource.service";
import {KanbanResource} from "./kanban-resource.service";
import {LocalesResource} from "./locales-resource.service";
import {FeedbackResource} from "./feedback-resource.service";
import {MembershipsResource} from "./memberships-resource.service";
import {ModulesResource} from "./modules-resource.service";
import {NotifyPoliciesResource} from "./notify-policies-resource.service";
import {RolesResource} from "./roles-resource.service";
import {SearchResource} from "./search-resource.service";
import {UserSettingsResource} from "./user-settings-resource.service";
import {WebhookLogsResource} from "./webhooklogs-resource.service";
import {WebhooksResource} from "./webhooks-resource.service";

import {SprintsResource} from "./sprints-resource.service";
import {AttachmentsResource} from "./attachments-resource.service";
import {EpicsResource} from "./epics-resource.service";
import {ExternalAppsResource} from "./external-apps-resource.service";
import {AsanaResource, GithubResource, JiraResource, TrelloResource} from "./importers-resource.service";
import {IssuesResource} from "./issues-resource.service";
import {ProjectsResource} from "./projects-resource.service";
import {StatsResource} from "./stats-resource.service";
import {TasksResource} from "./tasks-resource.service";
import {UserResource} from "./user-resource.service";
import {UsersResource} from "./users-resource.service";
import {UserstoriesResource} from "./userstories-resource.service";
import {WikiResource} from "./wiki-resource.service";

import {ResourcesService} from "./resources.service";

@NgModule({
    providers: [
        ResourcesService,
        CustomAttributesResource,
        CustomAttributesValuesResource,
        HistoryResource,
        InvitationsResource,
        KanbanResource,
        LocalesResource,
        FeedbackResource,
        MembershipsResource,
        ModulesResource,
        NotifyPoliciesResource,
        RolesResource,
        SearchResource,
        SprintsResource,
        UserSettingsResource,
        WebhookLogsResource,
        WebhooksResource,
        WikiResource,
        AttachmentsResource,
        EpicsResource,
        ExternalAppsResource,
        TrelloResource,
        JiraResource,
        GithubResource,
        AsanaResource,
        IssuesResource,
        ProjectsResource,
        StatsResource,
        TasksResource,
        UserResource,
        UsersResource,
        UserstoriesResource,
    ],
})
export class ResourcesModule {}
