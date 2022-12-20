export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"
export const SAVE_QUESTION = "SAVE_QUESTION"

export function addQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

export function addQuestionAnswer({ qid, authedUser, answer }) {
    return {
        type: SAVE_QUESTION_ANSWER,
        qid,
        answer,
        authedUser
    }
}


export function receiveQuestion(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}
