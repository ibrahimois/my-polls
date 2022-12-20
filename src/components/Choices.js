import React from 'react'
import { connect } from "react-redux"
import { handleSaveQuestionAnswer } from "../actions/shared"
import "../index.css"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />
    }
    return ComponentWithRouterProp
}

function Choices(props) {
    const navigate = useNavigate();
    const { dispatch, question, authedUser, id } = props;
    const handleAnswering = (option) => {

        dispatch(handleSaveQuestionAnswer({
            qid: id,
            answer: option,
            authedUser
        }))
        navigate("/")
    }

    return (
        <div className='answer'>
            <h1>Poll by {question.author}</h1>
            <h2>Would You Rather</h2>
            <div className="options">
                <div className="option-one">
                    <p>{question.optionOne.text}</p>
                    <button onClick={() => handleAnswering('optionOne')} >Click</button>
                </div>
                <div className="option-two">
                    <p>{question.optionTwo.text}</p>
                    <button onClick={() => handleAnswering("optionTwo")} >Click</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions }, props) => {
    const { id } = props.router.params

    return {
        id,
        authedUser,
        question: questions[id]
    }
}

export default withRouter(connect(mapStateToProps)(Choices))