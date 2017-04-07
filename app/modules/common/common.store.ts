import * as Immutable from "immutable";

export const commonInitialState = {
    "notification-messages": [],
};

export const commonReducer = (state, action) => {
    switch (action.type){
        case "DISCARD_NOTIFICATION_MESSAGE":
            return state.update("notification-messages", (s) => s.shift());
        case "ADD_NOTIFICATION_MESSAGE":
            return state.update("notification-messages", (s) => s.push(action.payload));
        default:
            return state;
    }
};
