import * as Immutable from "immutable";

export const epicsInitialState = {
    "epics": null,
    "user-stories": {},
    "current-epic": null,
};

export const epicsReducer = (state, action) => {
    switch (action.type) {
        case "SET_EPICS":
            return state.set("epics", action.payload);
        case "SET_EPIC":
            return state.update("epics", (epics) => {
                return epics.map((epic) => {
                    if (epic.get('id') === action.payload.get('id')) {
                        return action.payload
                    } else {
                        return epic
                    }
                });
            });
        case "SET_EPIC_USER_STORIES":
            return state.setIn(["user-stories", action.payload.id], action.payload.data);
        case "SET_CURRENT_EPIC":
            return state.set("current-epic", action.payload);
        case "APPEND_EPICS":
            return state.update("epics", (stories) => stories.concat(action.payload));
        case "CLEAN_EPICS_DATA":
            return Immutable.fromJS(epicsInitialState);
        default:
            return state;
    }
};
