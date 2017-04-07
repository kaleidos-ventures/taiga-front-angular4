import * as Immutable from "immutable";

export const issuesInitialState = {
    "AppliedFilters": {},
    "addTask": null,
    "archiveVisible": {},
    "bulk-create-state": null,
    "creation-state": null,
    "current-userstory": null,
    "filtersData": null,
    "folds": {},
    "issues": null,
    "zoomLevel": 4,
    "order": null,
};

export const issuesReducer = (state, action) => {
    switch (action.type) {
        case "SET_ISSUES":
            return state.set("issues", action.payload);
        case "SET_ISSUES_FILTERS_DATA":
            return state.set("filtersData", action.payload);
        case "SET_ISSUES_APPLIED_FILTERS":
            return state.set("appliedFilters", action.payload);
        case "SET_ISSUES_ORDER":
            return state.set("order", action.payload);
        case "CLEAN_ISSUES_DATA":
            return Immutable.fromJS(issuesInitialState);
        default:
            return state;
    }
};
