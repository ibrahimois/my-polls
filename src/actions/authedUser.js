export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const UN_SET_AUTHED_USER = "UN_SET_AUTHED_USER";

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id,
    };
}

function unSetAuthedUser(id) {
    return {
        type: UN_SET_AUTHED_USER
    }
}

export function handleSetAuthedUser(id) {
    return (dispatch, getState) => {
        const { users } = getState();
        if (users[id] != null) {
            dispatch(setAuthedUser(id))
        }
    }
}

export function handleUnSetAuthedUser(id) {
    return (dispatch) => {
        dispatch(unSetAuthedUser(id))
    }
}