import * as Immutable from "immutable";

export const authInitialState = {
    "user": {},
    "login-errors": {},
    "register-errors": {},
    "invitation": null,
};

export const authReducer = (state, action) => {
    switch (action.type){
        case "SET_USER":
            return state.set("user", action.payload);
        case "SET_LOGIN_ERRORS":
            return state.set("login-errors", action.payload);
        case "SET_REGISTER_ERRORS":
            return state.set("register-errors", action.payload);
        case "SET_PASSWORD_RECOVER_ERRORS":
            return state.set("password-recover-errors", action.payload);
        case "SET_INVITATION":
            return state.set("invitation", action.payload);
        default:
            return state;
    }
};
