import {CommonModule} from "@angular/common";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {TranslateModule} from "@ngx-translate/core";

import {TgCommonModule} from "../common/common.module";
import {TgPipesModule} from "../pipes/pipes.module";
import {TgComponentsModule} from "../components/components.module";
import {TgAttachmentsModule} from "../attachments/attachments.module";
import {TgServicesModule} from "../services/services.module";

import {AdminNav} from "./components/admin-nav/admin-nav.component";
import {AdminSubnavProject} from "./components/admin-subnav-project/admin-subnav-project.component";

import {AdminEffects} from "./admin.effects";

import {AdminProjectDetailsPage} from "./pages/project/project-details/project-details.component";
import {AdminDefaultValuesPage} from "./pages/project/default-values/default-values.component";
import {AdminDefaultValuesForm} from "./pages/project/default-values/default-values-form.component";
import {AdminModulesPage} from "./pages/project/modules/modules.component";
import {AdminModulesForm} from "./pages/project/modules/modules-form.component";
import {AdminExportPage} from "./pages/project/export/export.component";
import {AdminReportsPage} from "./pages/project/reports/reports.component";
import {AdminReportsItem} from "./pages/project/reports/reports-item.component";
import {AdminPermissionsPage} from "./pages/permissions/permissions.component";
import {AdminEditRole} from "./pages/permissions/permissions-edit-role.component";
import {AdminEditRolePermissions} from "./pages/permissions/permissions-edit-role-permissions.component";
import {AdminPermissionsRolesDeleteLightbox} from "./pages/permissions/permissions-roles-delete-lightbox.component"
import {AdminRolesNav} from "./pages/permissions/permissions-roles-nav.component";

import {AdminMembershipsPage} from "./pages/memberships/memberships.component";
import {AdminMembershipsTable} from "./pages/memberships/memberships-table.component";
import {AdminMembershipsRowRoleSelector} from "./pages/memberships/memberships-row-role-selector.component";
import {AdminMembershipsRowAvatar} from "./pages/memberships/memberships-row-avatar.component";
import {AdminMembershipsRowAdminCheckbox} from "./pages/memberships/memberships-row-admin-checkbox.component";
import {AdminMembershipsRowActions} from "./pages/memberships/memberships-row-actions.component";

import {AdminAttributesNav} from "./pages/attributes/attributes-nav.component";
import {AdminAttributesStatusPage} from "./pages/attributes/status/attributes-status.component";
import {AdminAttributesStatusEditor} from "./pages/attributes/status/attributes-status-editor.component";
import {AdminAttributesStatusRow} from "./pages/attributes/status/attributes-status-row.component";
import {AdminAttributesStatusForm} from "./pages/attributes/status/attributes-status-form.component";
import {AdminAttributesIssuesPrioritiesPage} from "./pages/attributes/issues/attributes-issues-priorities.component";
import {AdminAttributesIssuesSeveritiesPage} from "./pages/attributes/issues/attributes-issues-severities.component";
import {AdminAttributesIssuesTypesPage} from "./pages/attributes/issues/attributes-issues-types.component";
import {AdminAttributesIssuesEditor} from "./pages/attributes/issues/attributes-issues-editor.component";
import {AdminAttributesIssuesRow} from "./pages/attributes/issues/attributes-issues-row.component";
import {AdminAttributesIssuesForm} from "./pages/attributes/issues/attributes-issues-form.component";
import {AdminAttributesTagsPage} from "./pages/attributes/tags/attributes-tags.component";
import {AdminAttributesTagsEditor} from "./pages/attributes/tags/attributes-tags-editor.component";
import {AdminAttributesTagsRow} from "./pages/attributes/tags/attributes-tags-row.component";
import {AdminAttributesTagsForm} from "./pages/attributes/tags/attributes-tags-form.component";
import {AdminAttributesCustomFieldsPage} from "./pages/attributes/custom-fields/attributes-custom-fields.component";
import {AdminAttributesCustomFieldsEditor} from "./pages/attributes/custom-fields/attributes-custom-fields-editor.component";
import {AdminAttributesCustomFieldsRow} from "./pages/attributes/custom-fields/attributes-custom-fields-row.component";
import {AdminAttributesCustomFieldsForm} from "./pages/attributes/custom-fields/attributes-custom-fields-form.component";
import {AdminAttributesPointsPage} from "./pages/attributes/points/attributes-points.component";
import {AdminAttributesPointsEditor} from "./pages/attributes/points/attributes-points-editor.component";
import {AdminAttributesPointsRow} from "./pages/attributes/points/attributes-points-row.component";
import {AdminAttributesPointsForm} from "./pages/attributes/points/attributes-points-form.component";

import {AdminIntegrationsNav} from "./pages/integrations/integrations-nav.component";
import {AdminIntegrationsWebhooksPage} from "./pages/integrations/webhooks/webhooks.component";
import {AdminIntegrationsWebhooksEditor} from "./pages/integrations/webhooks/webhooks-editor.component";
import {AdminIntegrationsWebhooksRow} from "./pages/integrations/webhooks/webhooks-row.component";
import {AdminIntegrationsWebhooksForm} from "./pages/integrations/webhooks/webhooks-form.component";
import {AdminIntegrationsThirdPartiesPage} from "./pages/integrations/third-parties/third-parties.component";

@NgModule({
    declarations: [
        AdminProjectDetailsPage,
        AdminDefaultValuesPage,
        AdminDefaultValuesForm,
        AdminModulesPage,
        AdminModulesForm,
        AdminExportPage,
        AdminReportsPage,
        AdminReportsItem,
        AdminPermissionsPage,
        AdminEditRole,
        AdminEditRolePermissions,
        AdminPermissionsRolesDeleteLightbox,
        AdminRolesNav,
        AdminNav,
        AdminSubnavProject,

        AdminMembershipsPage,
        AdminMembershipsTable,
        AdminMembershipsRowRoleSelector,
        AdminMembershipsRowAvatar,
        AdminMembershipsRowAdminCheckbox,
        AdminMembershipsRowActions,

        AdminAttributesNav,
        AdminAttributesStatusPage,
        AdminAttributesStatusEditor,
        AdminAttributesStatusRow,
        AdminAttributesStatusForm,
        AdminAttributesIssuesPrioritiesPage,
        AdminAttributesIssuesSeveritiesPage,
        AdminAttributesIssuesTypesPage,
        AdminAttributesIssuesEditor,
        AdminAttributesIssuesRow,
        AdminAttributesIssuesForm,
        AdminAttributesTagsPage,
        AdminAttributesTagsEditor,
        AdminAttributesTagsRow,
        AdminAttributesTagsForm,
        AdminAttributesCustomFieldsPage,
        AdminAttributesCustomFieldsEditor,
        AdminAttributesCustomFieldsRow,
        AdminAttributesCustomFieldsForm,
        AdminAttributesPointsPage,
        AdminAttributesPointsEditor,
        AdminAttributesPointsRow,
        AdminAttributesPointsForm,

        AdminIntegrationsNav,
        AdminIntegrationsWebhooksPage,
        AdminIntegrationsWebhooksEditor,
        AdminIntegrationsWebhooksRow,
        AdminIntegrationsWebhooksForm,
        AdminIntegrationsThirdPartiesPage,
    ],
    exports: [
        AdminProjectDetailsPage,
        AdminDefaultValuesPage,
        AdminModulesPage,
        AdminExportPage,
        AdminReportsPage,
        AdminPermissionsPage,
        AdminAttributesStatusPage,
    ],
    imports: [
        CommonModule,
        TgCommonModule,
        TgComponentsModule,
        TgAttachmentsModule,
        TgServicesModule,
        TgPipesModule,
        ReactiveFormsModule,
        StoreModule,
        TranslateModule.forChild({}),
        RouterModule.forChild([
            { path: "project/:slug/admin", redirectTo: "project/:slug/admin/project-profile/details"},
            { path: "project/:slug/admin/project-profile/details", component: AdminProjectDetailsPage },
            { path: "project/:slug/admin/project-profile/default-values", component: AdminDefaultValuesPage },
            { path: "project/:slug/admin/project-profile/modules", component: AdminModulesPage },
            { path: "project/:slug/admin/project-profile/export", component: AdminExportPage },
            { path: "project/:slug/admin/project-profile/reports", component: AdminReportsPage },
            { path: "project/:slug/admin/roles", component: AdminPermissionsPage },
            { path: "project/:slug/admin/memberships", component: AdminMembershipsPage },
            { path: "project/:slug/admin/project-values", redirectTo: "project/:slug/admin/attributes/status"},
            { path: "project/:slug/admin/project-values/status", component: AdminAttributesStatusPage },
            { path: "project/:slug/admin/project-values/priorities", component: AdminAttributesIssuesPrioritiesPage },
            { path: "project/:slug/admin/project-values/severities", component: AdminAttributesIssuesSeveritiesPage },
            { path: "project/:slug/admin/project-values/types", component: AdminAttributesIssuesTypesPage },
            { path: "project/:slug/admin/project-values/tags", component: AdminAttributesTagsPage },
            { path: "project/:slug/admin/project-values/custom-fields", component: AdminAttributesCustomFieldsPage },
            { path: "project/:slug/admin/project-values/points", component: AdminAttributesPointsPage },
            { path: "project/:slug/admin/third-parties", redirectTo: "project/:slug/admin/third-parties/webhooks"},
            { path: "project/:slug/admin/third-parties/webhooks", component: AdminIntegrationsWebhooksPage},
            { path: "project/:slug/admin/third-parties/:type", component: AdminIntegrationsThirdPartiesPage},
        ]),
        EffectsModule.forFeature([AdminEffects]),
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AdminModule {}
