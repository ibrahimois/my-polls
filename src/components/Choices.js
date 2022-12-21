import React, { useState } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/shared";
import "../index.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  return ComponentWithRouterProp;
};

function Choices(props) {
  console.log(props.hasAnswered);
  const { dispatch, question, authedUser, id } = props;
  const [hasAnswered, setHasAnswered] = useState(props.hasAnswered);
  const handleAnswering = (option) => {
    dispatch(
      handleSaveQuestionAnswer({
        qid: id,
        answer: option,
        authedUser,
      })
    );
    setHasAnswered(true);
  };

  return (
    <div className="answer">
      <h1>Poll by {question.author}</h1>
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${props.user.avatarURL}")`,
        }}
      ></div>
      <h2>Would You Rather</h2>
      <div className="options">
        <div className="option-one">
          <p>{question.optionOne.text}</p>
          <button
            onClick={() => handleAnswering("optionOne")}
            disabled={hasAnswered}
          >
            Click
          </button>
        </div>
        <div className="option-two">
          <p>{question.optionTwo.text}</p>
          <button
            onClick={() => handleAnswering("optionTwo")}
            disabled={hasAnswered}
          >
            Click
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;
  var hasAnswered = false;
  if (!(id in users[questions[id].author].answers)) {
    hasAnswered = true;
  }
  return {
    id,
    authedUser,
    question: questions[id],
    user: users[questions[id].author],
    hasAnswered,
  };
};

export default withRouter(connect(mapStateToProps)(Choices));
