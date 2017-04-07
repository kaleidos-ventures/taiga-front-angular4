import * as Immutable from "immutable";

export const wikiInitialState = {
    "page": null,
    "pages": [],
    "history": [],
    "links": [],
    "page-attachments": [],
};

export const wikiReducer = (state, action) => {
    switch (action.type){
        case "SET_WIKI_PAGE":
            return state.set("page", action.payload);
        case "SET_WIKI_PAGES_LIST":
            return state.set("pages", action.payload);
        case "SET_WIKI_PAGE_HISTORY":
            return state.set("history", action.payload);
        case "SET_WIKI_PAGE_ATTACHMENTS":
            return state.set("page-attachments", action.payload);
        case "SET_WIKI_LINKS":
            return state.set("links", action.payload);
        case "ADD_WIKI_LINK":
            return state.update("links", (links) => links.push(action.payload));
        case "REMOVE_WIKI_LINK":
            let linkId = action.payload;
            return state.update("links", (links) =>
                links.filter((link) => link.get('id') != linkId)
            );
        default:
            return state;
    }
};
