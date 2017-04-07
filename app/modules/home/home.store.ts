import * as Immutable from "immutable";

export const homeInitialState = {
    "assigned-to": null,
    "watching": null,
};

export const homeReducer = (state, action) => {
    switch (action.type){
        case "SET_ASSIGNED_TO":
            return state.set("assigned-to", action.payload);
        case "SET_WATCHING":
            return state.set("watching", action.payload);
        case "CLEAN_HOME_DATA":
            return Immutable.fromJS(homeInitialState);
        default:
            return state;
    }
};
