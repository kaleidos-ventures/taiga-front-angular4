import {routerReducer} from "@ngrx/router-store";
import * as Immutable from "immutable";
import {authInitialState, authReducer} from "./modules/auth/auth.store";
import {discoverInitialState, discoverReducer} from "./modules/discover/discover.store";
import {homeInitialState, homeReducer} from "./modules/home/home.store";
import {profileInitialState, profileReducer} from "./modules/profile/profile.store";
import {detailInitialState, detailReducer} from "./modules/detail/detail.store";
import {kanbanInitialState, kanbanReducer} from "./modules/kanban/kanban.store";
import {backlogInitialState, backlogReducer} from "./modules/backlog/backlog.store";
import {taskboardInitialState, taskboardReducer} from "./modules/taskboard/taskboard.store";
import {epicsInitialState, epicsReducer} from "./modules/epics/epics.store";
import {issuesInitialState, issuesReducer} from "./modules/issues/issues.store";
import {projectsInitialState, projectsReducer} from "./modules/projects/projects.store";
import {teamInitialState, teamReducer} from "./modules/team/team.store";
import {commonInitialState, commonReducer} from "./modules/common/common.store";
import {wikiInitialState, wikiReducer} from "./modules/wiki/wiki.store";
import {userSettingsInitialState, userSettingsReducer} from "./modules/user-settings/user-settings.store";
import {adminInitialState, adminReducer} from "./modules/admin/admin.store";
import {searchInitialState, searchReducer} from "./modules/search/search.store";
import {filterInitialState, filterReducer} from "./modules/filter/filter.store";

export type IState = Immutable.Map<string, any>;

const globalInitialState = {
    "open-lightbox": "",
    "loading": false,
    "page-metadata": {
        "title": null,
        "title_args": {},
        "description": null,
        "description_args": {},
    },
    "joyride": {
        "key": null,
        "steps": null,
        "enabled": {},
    },
    "loading-items": {}
};

const initialState = Immutable.fromJS({
    global: globalInitialState,
    home: homeInitialState,
    profile: profileInitialState,
    detail: detailInitialState,
    kanban: kanbanInitialState,
    backlog: backlogInitialState,
    taskboard: taskboardInitialState,
    epics: epicsInitialState,
    issues: issuesInitialState,
    discover: discoverInitialState,
    common: commonInitialState,
    auth: authInitialState,
    wiki: wikiInitialState,
    admin: adminInitialState,
    projects: projectsInitialState,
    team: teamInitialState,
    "user-settings": userSettingsInitialState,
    search: searchInitialState,
    filter: filterInitialState,
    router: {
        path: window.location.pathname + window.location.search
    }
});

export const globalReducer = (state, action) => {
    switch (action.type){
        case "START_LOADING":
            return state.set("loading", true);
        case "STOP_LOADING":
            return state.set("loading", false);
        case "START_LOADING_ITEM":
            return state.setIn(["loading-items", action.payload], true);
        case "STOP_LOADING_ITEM":
            return state.setIn(["loading-items", action.payload], false);
        case "CLOSE_LIGHTBOX":
            return state.set("open-lightbox", "");
        case "OPEN_LIGHTBOX":
            return state.set("open-lightbox", action.payload);
        case "SET_METADATA":
            return state.set("page-metadata", Immutable.fromJS(action.payload))
        case "SET_JOYRIDE":
            return state.setIn(["joyride", "key"], action.payload.key)
                        .setIn(["joyride", "steps"], action.payload.steps);
        case "SET_JOYRIDE_ENABLED":
            return state.setIn(["joyride", "enabled"], action.payload)
        default:
            return state;
    }
};

export const rootReducer = (state=initialState, action) => {
    return state.set("router", Immutable.fromJS(routerReducer(state.get("router").toJS(), action)))
                .set("home", homeReducer(state.get("home"), action))
                .set("global", globalReducer(state.get("global"), action))
                .set("profile", profileReducer(state.get("profile"), action))
                .set("detail", detailReducer(state.get("detail"), action))
                .set("kanban", kanbanReducer(state.get("kanban"), action))
                .set("backlog", backlogReducer(state.get("backlog"), action))
                .set("taskboard", taskboardReducer(state.get("taskboard"), action))
                .set("epics", epicsReducer(state.get("epics"), action))
                .set("issues", issuesReducer(state.get("issues"), action))
                .set("projects", projectsReducer(state.get("projects"), action))
                .set("team", teamReducer(state.get("team"), action))
                .set("discover", discoverReducer(state.get("discover"), action))
                .set("auth", authReducer(state.get("auth"), action))
                .set("wiki", wikiReducer(state.get("wiki"), action))
                .set("admin", adminReducer(state.get("admin"), action))
                .set("search", searchReducer(state.get("search"), action))
                .set("filter", filterReducer(state.get("filter"), action))
                .set("user-settings", userSettingsReducer(state.get("user-settings"), action))
                .set("common", commonReducer(state.get("common"), action));
};
