import * as Immutable from "immutable";

export const adminInitialState = {
    "memberships": null,
    "third-party": null,
    "webhooks": null,
    "webhooks-editing": {},
    "webhooks-adding": true,
    "webhooks-logs": {},
};

export const adminReducer = (state, action) => {
    switch (action.type){
        case "SET_ADMIN_WEBHOOKS":
            return state.set("webhooks", action.payload)
                        .set("webhooks-adding", action.payload.size == 0);
        case "SET_ADMIN_MEMBERSHIPS":
            return state.set("memberships", action.payload);
        case "SET_ADMIN_THIRD_PARTY":
            return state.set("third-party", action.payload);
        case "SET_WEBHOOK_LOG":
            return state.setIn(["webhooks-logs", action.payload.id], action.payload.log);
        case "ADD_WEBHOOK_LOG_ENTRY":
            return state.updateIn(["webhooks-logs", action.payload.id], (log) => log && log.unshift(action.payload.log));
        case "SET_WEBHOOK_EDIT":
            return state.setIn(["webhooks-editing", action.payload.id], action.payload.active);
        case "SET_WEBHOOK_ADDING":
            return state.set("webhooks-adding", action.payload);
        default:
            return state;
    }
};
