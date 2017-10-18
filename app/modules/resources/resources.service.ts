import { Injectable } from "@angular/core";

import {UrlsService} from "../base/urls";

import {CustomAttributesResource} from "./custom-attributes-resource.service";
import {CustomAttributesValuesResource} from "./custom-attributes-values-resource.service";
import {HistoryResource} from "./history-resource.service";
import {InvitationsResource} from "./invitations-resource.service";
import {KanbanResource} from "./kanban-resource.service";
import {LocalesResource} from "./locales-resource.service";
import {MembershipsResource} from "./memberships-resource.service";
import {ModulesResource} from "./modules-resource.service";
import {NotifyPoliciesResource} from "./notify-policies-resource.service";
import {RolesResource} from "./roles-resource.service";
import {SearchResource} from "./search-resource.service";
import {UserSettingsResource} from "./user-settings-resource.service";
import {WebhookLogsResource} from "./webhooklogs-resource.service";
import {WebhooksResource} from "./webhooks-resource.service";
import {WikiResource} from "./wiki-resource.service";

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
import {FeedbackResource} from "./feedback-resource.service";

const api_urls = {
    // Auth
    "auth": "/auth",
    "auth-register": "/auth/register",
    "invitations": "/invitations",

    // User
    "users": "/users",
    "user": "/users/%s",
    "by_username": "/users/by_username",
    "users-password-recovery": "/users/password_recovery",
    "users-change-password-from-recovery": "/users/change_password_from_recovery",
    "users-change-password": "/users/change_password",
    "users-change-email": "/users/change_email",
    "users-cancel-account": "/users/cancel",
    "user-stats": "/users/%s/stats",
    "user-liked": "/users/%s/liked",
    "user-voted": "/users/%s/voted",
    "user-watched": "/users/%s/watched",
    "user-contacts": "/users/%s/contacts",
    "user-me": "/users/me",

    // User - Notification
    "permissions": "/permissions",
    "notify-policies": "/notify-policies",
    "notify-policy": "/notify-policies/%s",

    // User - Storage
    "user-storage": "/user-storage",

    // Memberships
    "memberships": "/memberships",
    "bulk-create-memberships": "/memberships/bulk_create",

    // Roles & Permissions
    "roles": "/roles",
    "role": "/roles/%s",

    // Resolver
    "resolver": "/resolver",

    // Project
    "projects": "/projects",
    "project": "/projects/%s",
    "project-templates": "/project-templates",
    "project-modules": "/projects/%s/modules",
    "bulk-update-projects-order": "/projects/bulk_update_order",
    "project-like": "/projects/%s/like",
    "project-unlike": "/projects/%s/unlike",
    "project-watch": "/projects/%s/watch",
    "project-unwatch": "/projects/%s/unwatch",
    "project-contact": "contact",
    "project-transfer-validate-token": "/projects/%s/transfer_validate_token",
    "project-transfer-accept": "/projects/%s/transfer_accept",
    "project-transfer-reject": "/projects/%s/transfer_reject",
    "project-transfer-request": "/projects/%s/transfer_request",
    "project-transfer-start": "/projects/%s/transfer_start",

    // Project Values - Choises
    "epic-statuses": "/epic-statuses",
    "userstory-statuses": "/userstory-statuses",
    "points": "/points",
    "task-statuses": "/task-statuses",
    "issue-statuses": "/issue-statuses",
    "issue-types": "/issue-types",
    "priorities": "/priorities",
    "severities": "/severities",

    // Milestones/Sprints
    "milestones": "/milestones",
    "milestone": "/milestones/%s",

    // Epics
    "epics": "/epics",
    "epic-upvote": "/epics/%s/upvote",
    "epic-downvote": "/epics/%s/downvote",
    "epic-watch": "/epics/%s/watch",
    "epic-unwatch": "/epics/%s/unwatch",
    "epic-related-userstories": "/epics/%s/related_userstories",
    "epic-related-userstories-bulk-create": "/epics/%s/related_userstories/bulk_create",

    // User stories
    "userstories": "/userstories",
    "userstory": "/userstories/%s",
    "bulk-create-us": "/userstories/bulk_create",
    "bulk-update-us-backlog-order": "/userstories/bulk_update_backlog_order",
    "bulk-update-us-milestone": "/userstories/bulk_update_milestone",
    "bulk-update-us-miles-order": "/userstories/bulk_update_sprint_order",
    "bulk-update-us-kanban-order": "/userstories/bulk_update_kanban_order",
    "userstories-filters": "/userstories/filters_data",
    "userstory-upvote": "/userstories/%s/upvote",
    "userstory-downvote": "/userstories/%s/downvote",
    "userstory-watch": "/userstories/%s/watch",
    "userstory-unwatch": "/userstories/%s/unwatch",

    // Tasks
    "tasks": "/tasks",
    "bulk-create-tasks": "/tasks/bulk_create",
    "bulk-update-task-taskboard-order": "/tasks/bulk_update_taskboard_order",
    "task-upvote": "/tasks/%s/upvote",
    "task-downvote": "/tasks/%s/downvote",
    "task-watch": "/tasks/%s/watch",
    "task-unwatch": "/tasks/%s/unwatch",
    "task-filters": "/tasks/filters_data",

    // Issues
    "issues": "/issues",
    "bulk-create-issues": "/issues/bulk_create",
    "issues-filters": "/issues/filters_data",
    "issue-upvote": "/issues/%s/upvote",
    "issue-downvote": "/issues/%s/downvote",
    "issue-watch": "/issues/%s/watch",
    "issue-unwatch": "/issues/%s/unwatch",

    // Wiki pages
    "wiki": "/wiki",
    "wiki-by-slug": "/wiki/by_slug",
    "wiki-page": "/wiki/%s",
    "wiki-restore": "/wiki/%s/restore",
    "wiki-links": "/wiki-links",
    "wiki-link": "/wiki-links/%s",

    // History
    "history/epic": "/history/epic",
    "history/us": "/history/userstory",
    "history/issue": "/history/issue",
    "history/task": "/history/task",
    "history/wiki": "/history/wiki/%s",

    // Attachments
    "attachments/epic": "/epics/attachments",
    "attachments/us": "/userstories/attachments",
    "attachments/issue": "/issues/attachments",
    "attachments/task": "/tasks/attachments",
    "attachments/wiki_page": "/wiki/attachments",

    // Custom Attributess
    "custom-attributes/epic": "/epic-custom-attributes",
    "custom-attributes/userstory": "/userstory-custom-attributes",
    "custom-attributes/task": "/task-custom-attributes",
    "custom-attributes/issue": "/issue-custom-attributes",

    // Custom Attributess - Values
    "custom-attributes-values/epic": "/epics/custom-attributes-values",
    "custom-attributes-values/userstory": "/userstories/custom-attributes-values",
    "custom-attributes-values/task": "/tasks/custom-attributes-values",
    "custom-attributes-values/issue": "/issues/custom-attributes-values",

    // Webhooks
    "webhooks": "/webhooks",
    "webhook": "/webhooks/%s",
    "webhooks-test": "/webhooks/%s/test",
    "webhooklogs": "/webhooklogs",
    "webhooklogs-resend": "/webhooklogs/%s/resend",

    // Reports - CSV
    "epics-csv": "/epics/csv?uuid=%s",
    "userstories-csv": "/userstories/csv?uuid=%s",
    "tasks-csv": "/tasks/csv?uuid=%s",
    "issues-csv": "/issues/csv?uuid=%s",

    // Timeline
    "timeline-profile": "/timeline/profile/%s",
    "timeline-user": "/timeline/user",
    "timeline-project": "/timeline/project/%s",

    // Search
    "search": "/search",

    // Export/Import
    "exporter": "/exporter",
    "importer": "/importer/load_dump",

    // Feedback
    "feedback": "/feedback",

    // locales
    "locales": "/locales",

    // Application tokens
    "applications": "/applications",
    "application-tokens": "/application-tokens",

    // Stats
    "stats-discover": "/stats/discover",

    // Importers
    "importers-trello-auth-url": "/importers/trello/auth_url",
    "importers-trello-authorize": "/importers/trello/authorize",
    "importers-trello-list-projects": "/importers/trello/list_projects",
    "importers-trello-list-users": "/importers/trello/list_users",
    "importers-trello-import-project": "/importers/trello/import_project",

    "importers-jira-auth-url": "/importers/jira/auth_url",
    "importers-jira-authorize": "/importers/jira/authorize",
    "importers-jira-list-projects": "/importers/jira/list_projects",
    "importers-jira-list-users": "/importers/jira/list_users",
    "importers-jira-import-project": "/importers/jira/import_project",

    "importers-github-auth-url": "/importers/github/auth_url",
    "importers-github-authorize": "/importers/github/authorize",
    "importers-github-list-projects": "/importers/github/list_projects",
    "importers-github-list-users": "/importers/github/list_users",
    "importers-github-import-project": "/importers/github/import_project",

    "importers-asana-auth-url": "/importers/asana/auth_url",
    "importers-asana-authorize": "/importers/asana/authorize",
    "importers-asana-list-projects": "/importers/asana/list_projects",
    "importers-asana-list-users": "/importers/asana/list_users",
    "importers-asana-import-project": "/importers/asana/import_project",
};

@Injectable()
export class ResourcesService {
    constructor(public customAttributes: CustomAttributesResource,
                public customAttributesValues: CustomAttributesValuesResource,
                public history: HistoryResource,
                public invitations: InvitationsResource,
                public kanban: KanbanResource,
                public locales: LocalesResource,
                public feedback: FeedbackResource,
                public memberships: MembershipsResource,
                public modules: ModulesResource,
                public notifyPolicies: NotifyPoliciesResource,
                public roles: RolesResource,
                public search: SearchResource,
                public sprints: SprintsResource,
                public userSettings: UserSettingsResource,
                public webhookLogs: WebhookLogsResource,
                public webhooks: WebhooksResource,
                public wiki: WikiResource,
                public attachments: AttachmentsResource,
                public epics: EpicsResource,
                public externalApps: ExternalAppsResource,
                public trelloImporter: TrelloResource,
                public jiraImporter: JiraResource,
                public githubImporter: GithubResource,
                public asanaImporter: AsanaResource,
                public issues: IssuesResource,
                public projects: ProjectsResource,
                public stats: StatsResource,
                public tasks: TasksResource,
                public user: UserResource,
                public users: UsersResource,
                public userstories: UserstoriesResource,
                private urls: UrlsService) {
        this.urls.update(api_urls);
    }
}
