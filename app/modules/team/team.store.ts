import * as Immutable from "immutable";

export const teamInitialState = {
    "stats": null,
};

export const teamReducer = (state, action) => {
    switch (action.type){
        case "SET_TEAM_STATS":
            return state.set("stats", action.payload);
        case "CLEAN_TEAM_DATA":
            return Immutable.fromJS(teamInitialState);
        default:
            return state;
    }
};
