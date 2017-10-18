import * as Immutable from "immutable";

export const projectsInitialState = {
    "user-projects": [],
    "current-project": null,
    "create": {
        "base-project-memberships": []
    },
    "timeline": {
        "items": null,
        "has-next": true,
        "current-page": 0,
    }
};

export const projectsReducer = (state, action) => {
    switch (action.type){
        case "SET_USER_PROJECTS":
            return state.set("user-projects", action.payload);
        case "SET_CURRENT_PROJECT":
            let membersById = action.payload.get('members')
                                    .reduce((members, member) => members.set(member.get('id'), member),
                                            Immutable.Map());
            let usStatusesById = action.payload.get('us_statuses')
                                    .reduce((usStatuses, usStatus) => usStatuses.set(usStatus.get('id'), usStatus),
                                            Immutable.Map());
            let taskStatusesById = action.payload.get('task_statuses')
                                    .reduce((taskStatuses, taskStatus) => taskStatuses.set(taskStatus.get('id'), taskStatus),
                                            Immutable.Map());
            let issueStatusesById = action.payload.get('issue_statuses')
                                    .reduce((issueStatuses, issueStatus) => issueStatuses.set(issueStatus.get('id'), issueStatus),
                                            Immutable.Map());
            let issueTypesById = action.payload.get('issue_types')
                                    .reduce((issueTypes, issueType) => issueTypes.set(issueType.get('id'), issueType),
                                            Immutable.Map());
            let severitiesById = action.payload.get('severities')
                                    .reduce((severities, severity) => severities.set(severity.get('id'), severity),
                                            Immutable.Map());
            let prioritiesById = action.payload.get('priorities')
                                    .reduce((priorities, priority) => priorities.set(priority.get('id'), priority),
                                            Immutable.Map());
            return state.set("current-project", action.payload)
                        .setIn(["current-project", "members_by_id"], membersById)
                        .setIn(["current-project", "us_statuses_by_id"], usStatusesById)
                        .setIn(["current-project", "task_statuses_by_id"], taskStatusesById)
                        .setIn(["current-project", "issue_statuses_by_id"], issueStatusesById)
                        .setIn(["current-project", "issue_types_by_id"], issueTypesById)
                        .setIn(["current-project", "severities_by_id"], severitiesById)
                        .setIn(["current-project", "priorities_by_id"], prioritiesById);
        case "SET_DUPLICATE_BASE_PROJECT_MEMBERSHIPS":
            return state.setIn(["create", "base-project-memberships"], action.payload)
        case "SET_PROJECT_TIMELINE":
            return state.setIn(["timeline", "items"], action.payload.timeline)
                        .setIn(["timeline", "has-next"], action.payload.hasNext)
                        .setIn(["timeline", "current-page"], action.payload.currentPage);
        case "APPEND_PROJECT_TIMELINE":
            return state.updateIn(["timeline", "items"], (current) => current.concat(action.payload.timeline))
                        .setIn(["timeline", "has-next"], action.payload.hasNext)
                        .setIn(["timeline", "current-page"], action.payload.currentPage);
        case "SET_ROLE":
            return state.updateIn(["current-project", "roles"], (roles) => {
                let idx = roles.findKey((r) => r.get('id') == action.payload.get('id'))
                if (idx !== undefined) {
                    return roles.set(idx, action.payload);
                }
                return roles;
            });
        default:
            return state;
    }
};
