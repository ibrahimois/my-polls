import { getInitialData, saveQuestionAnswer, saveQuestion } from "../Utils/api";
import { setAuthedUser } from "./authedUser";
import { receiveQuestion, addQuestion, addQuestionAnswer } from "./questions";
import { receiveUsers, saveQuestionAnswerToUser, saveQuestionToUser } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar"

const AUTHED_ID = null;

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestion(questions))
            dispatch(setAuthedUser(AUTHED_ID));
            dispatch(hideLoading())
        })
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        }).then((question) => {
            dispatch(addQuestion(question))
            dispatch(saveQuestionToUser(question, authedUser))
        })
            .then(() => dispatch(hideLoading()))
    }
}



export function handleSaveQuestionAnswer(info) {
    return (dispatch) => {
        dispatch(showLoading());
        return saveQuestionAnswer(info).then(() => {
            dispatch(addQuestionAnswer(info))
            dispatch(saveQuestionAnswerToUser(info))
            dispatch(hideLoading())
        }).catch((e) => {
            console.warn("Error in HandleQuestionAnswer: ", e)
            alert("There was an error answering a question ")
        })
    }
}