import React from 'react'
import { connect } from "react-redux"
import QuestionDetails from './QuestionDetails'

function Dashboard(props) {
    return (
        <>
            <div className="container">
                <h3 style={{ textAlign: "center" }}>New Questions</h3>
                <ul style={{ display: "flex", gap: "3rem", justifyContent: "center" }}>
                    {props.unAnsweredQuestions
                        .map((id) => {
                            return <li key={id}>
                                <QuestionDetails id={id} />
                            </li>
                        })}
                </ul>
            </div>
            <br />
            <hr />
            <div className="done">
                <h3 style={{ textAlign: "center" }}>Done</h3>
                <ul style={{ display: "flex", gap: "3rem", justifyContent: "center" }}>
                    {props.answeredQuestions
                        .map((id) => {
                            return <li key={id}>
                                <QuestionDetails id={id} />
                            </li>
                        })}
                </ul>
            </div>
        </>
    )
}

const mapStateToProps = ({ questions, authedUser, users }) => {
    const questionsList = Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
    )
    const user = users[authedUser]
    const answeredQuestions = questionsList.filter(question => user.answers[question])
    const unAnsweredQuestions = questionsList.filter(question => !user.answers[question])
    return {
        answeredQuestions,
        unAnsweredQuestions
    }
}

export default connect(mapStateToProps)(Dashboard);