import { SET_AUTHED_USER, UN_SET_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id
        case UN_SET_AUTHED_USER:
            return null;
        default: return state;
    }
}