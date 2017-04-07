import * as Immutable from "immutable";
import * as _ from "lodash";

export const filterInitialState = {
    "backlog-custom-filters": {},
    "kanban-custom-filters": {},
    "issues-custom-filters": {},
    "backlog": {
        "q": "",
        "status": [],
        "tags": [],
        "assigned_to": [],
        "owner": [],
        "epic": [],
    },
    "kanban": {
        "q": "",
        "status": [],
        "tags": [],
        "assigned_to": [],
        "owner": [],
        "epic": [],
    },
    "taskboard": {
        "q": "",
        "status": [],
        "tags": [],
        "assigned_to": [],
        "owner": [],
    },
    "issues": {
        "q": "",
        "type": [],
        "severity": [],
        "priority": [],
        "status": [],
        "tags": [],
        "assigned_to": [],
        "owner": [],
    }
};

export const filterReducer = (state, action) => {
    switch (action.type){
        case "SET_FILTER":
            return state.setIn(
                [action.payload.section, action.payload.filter],
                Immutable.fromJS(action.payload.id)
            );
        case "SET_FILTERS":
            let filters = _.extend({}, filterInitialState[action.payload.section], action.payload.filters)
            return state.set(
                action.payload.section,
                Immutable.fromJS(filters)
            );
        case "SET_CUSTOM_FILTERS":
            return state.set(`${action.payload.section}-custom-filters`, action.payload.filter);
        case "ADD_FILTER":
            return state.updateIn(
                [action.payload.section, action.payload.filter],
                (values) => values.push(action.payload.id)
            );
        case "REMOVE_FILTER":
            return state.updateIn(
                [action.payload.section, action.payload.filter],
                (values) => values.filter((id) => id.toString() !== action.payload.id.toString())
            );
        default:
            return state;
    }
};
