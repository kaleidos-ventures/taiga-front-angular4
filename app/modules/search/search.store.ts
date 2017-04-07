import * as Immutable from "immutable";

export const searchInitialState = {
    "results": null,
};

export const searchReducer = (state, action) => {
    switch (action.type){
        case "SET_SEARCH_RESULTS":
            return state.set("results", action.payload);
        case "CLEAN_SEARCH_DATA":
            return Immutable.fromJS(searchInitialState);
        default:
            return state;
    }
};
