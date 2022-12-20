export const RECEIVE_USERS = "RECEIVE_USERS"
export const SAVE_ANSWER_TO_USERS = "SAVE_ANSWER_TO_USERS"
export const SAVE_QUESTION_TO_USERS = "SAVE_QUESTION_TO_USERS"

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function saveQuestionAnswerToUser({ qid, authedUser, answer }) {
    return {
        type: SAVE_ANSWER_TO_USERS,
        qid,
        answer,
        authedUser
    }
}

export function saveQuestionToUser(question, authedUser) {
    return {
        type: SAVE_QUESTION_TO_USERS,
        question,
        authedUser
    }
}