import React, { useState } from "react";
import { connect } from "react-redux";
import QuestionDetails from "./QuestionDetails";

function Dashboard(props) {
  const [show, setShow] = useState(true);

  const handleShowQuestions = () => {
    setShow(!show);
  };

  if (
    props.authedUser === null &&
    window.location.href != "http://localhost:3000/login"
  ) {
    window.location.href = "http://localhost:3000/login";
  }

  return (
    <>
      {show === true ? (
        <div className="container">
          <h3 style={{ textAlign: "center" }}>New Questions</h3>
          <ul
            style={{ display: "flex", gap: "3rem", justifyContent: "center" }}
          >
            {props.unAnsweredQuestions.map((id) => {
              return (
                <li key={id}>
                  <QuestionDetails id={id} />
                </li>
              );
            })}
          </ul>
          <br />
          <button style={{ marginLeft: "45rem" }} onClick={handleShowQuestions}>
            Show Answerd Questions
          </button>
        </div>
      ) : (
        <div className="done">
          <h3 style={{ textAlign: "center" }}>Done</h3>
          <ul
            style={{ display: "flex", gap: "3rem", justifyContent: "center" }}
          >
            {props.answeredQuestions.map((id) => {
              return (
                <li key={id}>
                  <QuestionDetails id={id} />
                </li>
              );
            })}
          </ul>
          <br />
          <button style={{ marginLeft: "45rem" }} onClick={handleShowQuestions}>
            Show New Questions
          </button>
        </div>
      )}
    </>
  );
}

const mapStateToProps = ({ questions, authedUser, users }) => {
  if (authedUser !== null) {

    const questionsList = Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
    const user = users[authedUser];
    const answeredQuestions = questionsList.filter(
      (question) => user.answers[question]
    );
    const unAnsweredQuestions = questionsList.filter(
      (question) => !user.answers[question]
    );
    return {
      answeredQuestions,
      unAnsweredQuestions,
      authedUser,
    };
  } else {
    return {
      authedUser
    }
  }
};

export default connect(mapStateToProps)(Dashboard);
