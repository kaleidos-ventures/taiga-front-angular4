import * as Immutable from "immutable";

export const adminInitialState = {
    "memberships": null,
};

export const adminReducer = (state, action) => {
    switch (action.type){
        case "SET_ADMIN_WEBHOOKS":
            return state.set("webhooks", action.payload);
        case "SET_ADMIN_MEMBERSHIPS":
            return state.set("memberships", action.payload);
        default:
            return state;
    }
};
