import * as Immutable from "immutable";

export const profileInitialState = {
    "user": null,
    "stats": null,
    "contacts": null,
    "items": null,
    "projects": null,
    "timeline": null,
};

export const profileReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER_PROFILE":
            return state.set("user", action.payload);
        case "SET_USER_STATS":
            return state.set("stats", action.payload);
        case "SET_PROFILE_CONTACTS":
            return state.set("contacts", action.payload);
        case "SET_PROFILE_ITEMS":
            return state.set("items", action.payload);
        case "SET_PROFILE_PROJECTS":
            return state.set("projects", action.payload);
        case "SET_PROFILE_TIMELINE":
            return state.set("timeline", action.payload);
        case "APPEND_PROFILE_TIMELINE":
            return state.update("timeline", (timeline) => {
                if (timeline === null) {
                    return action.payload;
                }
                return timeline.update('timeline', (t) => t.concat(action.payload.get('timeline')))
                               .set('hasNext', action.payload.get('hasNext'));
            });
        case "CLEAN_PROFILE_DATA":
            return Immutable.fromJS(profileInitialState);
        default:
            return state;
    }
};
