import {Component, Input, OnChanges} from "@angular/core";
import {Store} from "@ngrx/store";
import {IState} from "../../../../app.store";
import * as Immutable from "immutable";
import * as actions from "../../admin.actions";
import * as _ from "lodash";

@Component({
    selector: "tg-admin-edit-role-permissions",
    template: require("./permissions-edit-role-permissions.pug"),
})
export class AdminEditRolePermissions implements OnChanges {
    @Input() role: Immutable.Map<string, any>;
    @Input() project: Immutable.Map<string, any>;
    categories: any[] = [];
    openCategories: any = {};

    constructor(private store: Store<IState>) {}

    ngOnChanges(changes) {
        if (this.project && this.role) {
            this.categories = this.generateCategoriesFromRole(this.role, this.project);
        }
    }

    generateCategoriesFromRole(role, project) {
        const setActivePermissions = (permissions) => _.map(permissions, (x) => _.extend({}, x, {active: role.get('permissions').includes(x["key"])}));

        const isPermissionEditable = function(permission, role, project) {
            if (role.get('external_user') &&
               !project.is_private &&
               (permission.key.indexOf("view_") === 0)) {
                return false;
            } else {
                return true;
            }
        };

        const setActivePermissionsPerCategory = (category) =>
            _.map(category, function(cat: any) {
                cat.permissions = cat.permissions.map(function(permission) {
                    permission.editable = isPermissionEditable(permission, role, project);

                    return permission;
                });

                return _.extend({}, cat, {
                    activePermissions: _.filter(cat["permissions"], "active").length,
                });
            })
        ;

        const categories = [];

        const epicPermissions = [
            { key: "view_epics", name: "COMMON.PERMISIONS_CATEGORIES.EPICS.VIEW_EPICS"},
            { key: "add_epic", name: "COMMON.PERMISIONS_CATEGORIES.EPICS.ADD_EPICS"},
            { key: "modify_epic", name: "COMMON.PERMISIONS_CATEGORIES.EPICS.MODIFY_EPICS"},
            { key: "comment_epic", name: "COMMON.PERMISIONS_CATEGORIES.EPICS.COMMENT_EPICS"},
            { key: "delete_epic", name: "COMMON.PERMISIONS_CATEGORIES.EPICS.DELETE_EPICS"},
        ];
        categories.push({
            name: "COMMON.PERMISIONS_CATEGORIES.EPICS.NAME" ,
            permissions: setActivePermissions(epicPermissions),
        });

        const milestonePermissions = [
            { key: "view_milestones", name: "COMMON.PERMISIONS_CATEGORIES.SPRINTS.VIEW_SPRINTS"},
            { key: "add_milestone", name: "COMMON.PERMISIONS_CATEGORIES.SPRINTS.ADD_SPRINTS"},
            { key: "modify_milestone", name: "COMMON.PERMISIONS_CATEGORIES.SPRINTS.MODIFY_SPRINTS"},
            { key: "delete_milestone", name: "COMMON.PERMISIONS_CATEGORIES.SPRINTS.DELETE_SPRINTS"},
        ];
        categories.push({
            name: "COMMON.PERMISIONS_CATEGORIES.SPRINTS.NAME",
            permissions: setActivePermissions(milestonePermissions),
        });

        const userStoryPermissions = [
            { key: "view_us", name: "COMMON.PERMISIONS_CATEGORIES.USER_STORIES.VIEW_USER_STORIES"},
            { key: "add_us", name: "COMMON.PERMISIONS_CATEGORIES.USER_STORIES.ADD_USER_STORIES"},
            { key: "modify_us", name: "COMMON.PERMISIONS_CATEGORIES.USER_STORIES.MODIFY_USER_STORIES"},
            { key: "comment_us", name: "COMMON.PERMISIONS_CATEGORIES.USER_STORIES.COMMENT_USER_STORIES"},
            { key: "delete_us", name: "COMMON.PERMISIONS_CATEGORIES.USER_STORIES.DELETE_USER_STORIES"},
        ];
        categories.push({
            name: "COMMON.PERMISIONS_CATEGORIES.USER_STORIES.NAME",
            permissions: setActivePermissions(userStoryPermissions),
        });

        const taskPermissions = [
            { key: "view_tasks", name: "COMMON.PERMISIONS_CATEGORIES.TASKS.VIEW_TASKS"},
            { key: "add_task", name: "COMMON.PERMISIONS_CATEGORIES.TASKS.ADD_TASKS"},
            { key: "modify_task", name: "COMMON.PERMISIONS_CATEGORIES.TASKS.MODIFY_TASKS"},
            { key: "comment_task", name: "COMMON.PERMISIONS_CATEGORIES.TASKS.COMMENT_TASKS"},
            { key: "delete_task", name: "COMMON.PERMISIONS_CATEGORIES.TASKS.DELETE_TASKS"},
        ];
        categories.push({
            name: "COMMON.PERMISIONS_CATEGORIES.TASKS.NAME" ,
            permissions: setActivePermissions(taskPermissions),
        });

        const issuePermissions = [
            { key: "view_issues", name: "COMMON.PERMISIONS_CATEGORIES.ISSUES.VIEW_ISSUES"},
            { key: "add_issue", name: "COMMON.PERMISIONS_CATEGORIES.ISSUES.ADD_ISSUES"},
            { key: "modify_issue", name: "COMMON.PERMISIONS_CATEGORIES.ISSUES.MODIFY_ISSUES"},
            { key: "comment_issue", name: "COMMON.PERMISIONS_CATEGORIES.ISSUES.COMMENT_ISSUES"},
            { key: "delete_issue", name: "COMMON.PERMISIONS_CATEGORIES.ISSUES.DELETE_ISSUES"},
        ];
        categories.push({
            name: "COMMON.PERMISIONS_CATEGORIES.ISSUES.NAME",
            permissions: setActivePermissions(issuePermissions),
        });

        const wikiPermissions = [
            { key: "view_wiki_pages", name: "COMMON.PERMISIONS_CATEGORIES.WIKI.VIEW_WIKI_PAGES"},
            { key: "add_wiki_page", name: "COMMON.PERMISIONS_CATEGORIES.WIKI.ADD_WIKI_PAGES"},
            { key: "modify_wiki_page", name: "COMMON.PERMISIONS_CATEGORIES.WIKI.MODIFY_WIKI_PAGES"},
            { key: "delete_wiki_page", name: "COMMON.PERMISIONS_CATEGORIES.WIKI.DELETE_WIKI_PAGES"},
            { key: "view_wiki_links", name: "COMMON.PERMISIONS_CATEGORIES.WIKI.VIEW_WIKI_LINKS"},
            { key: "add_wiki_link", name: "COMMON.PERMISIONS_CATEGORIES.WIKI.ADD_WIKI_LINKS"},
            { key: "delete_wiki_link", name: "COMMON.PERMISIONS_CATEGORIES.WIKI.DELETE_WIKI_LINKS"},
        ];
        categories.push({
            name: "COMMON.PERMISIONS_CATEGORIES.WIKI.NAME",
            permissions: setActivePermissions(wikiPermissions),
        });

        return setActivePermissionsPerCategory(categories);
    };

    togglePermission(event, permission) {
        $(event.target).prop('checked', this.role.get('permissions').find((p) => p == permission) !== undefined);
        this.store.dispatch(new actions.ToggleRolePermissionAction(this.role, permission));
    }
}
