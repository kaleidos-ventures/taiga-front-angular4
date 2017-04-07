import * as Immutable from "immutable";

export const discoverInitialState = {
    "most-active": null,
    "most-liked": null,
    "featured": null,
    "search-results": null,
    "results-next-page": 0,
    "projects-count": null,
};

export const discoverReducer = (state, action) => {
    switch (action.type){
        case "SET_MOST_LIKED":
            return state.set("most-liked", action.payload);
        case "SET_MOST_ACTIVE":
            return state.set("most-active", action.payload);
        case "SET_FEATURED_PROJECTS":
            return state.set("featured", action.payload);
        case "SET_PROJECTS_STATS":
            return state.set("projects-count", action.payload);
        case "APPEND_DISCOVER_SEARCH_RESULTS":
            return state.update("search-results", (projects) => {
                if (projects !== null) {
                    return projects.concat(action.payload);
                }
                return action.payload;
            })
        case "SET_DISCOVER_SEARCH_RESULTS":
            return state.set("search-results", action.payload);
        case "UPDATE_DISCOVER_SEARCH_NEXT_PAGE":
            return state.update("results-next-page", (value) => {
                if (action.payload) {
                    return value + 1;
                }
                return null;
            });
        case "CLEAN_DISCOVER_DATA":
            return Immutable.fromJS(discoverInitialState);
        default:
            return state;
    }
};
