import React from 'react'
import { connect } from "react-redux"
import { formatDate, formatQuestion } from "../Utils/helpers"
import { useNavigate } from 'react-router-dom'


function QuestionDetails(props) {
    const navigate = useNavigate();
    const { name, timestamp, id } = props.question

    const handleShowingQuestion = () => {
        // TODO: redirect to question
        navigate(`/answer/${id}`)
    }

    return (
        <div>
            <h5>{name}</h5>
            <p>{formatDate(timestamp)}</p>
            <button onClick={handleShowingQuestion} >Show</button>
        </div>
    )
}
const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
    const question = questions[id];

    return {
        authedUser,
        question: formatQuestion(question, users[question.author], users[authedUser])
    }
}

export default connect(mapStateToProps)(QuestionDetails)