import React, { useState } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/shared";
import "../index.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import myImage from "../assets/avatar-svgrepo-com.svg";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
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
  const { dispatch, question, authedUser, id } = props;
  const [hasAnswered, setHasAnswered] = useState(props.hasAnswered);
  const [choosenOption, setChoosenOption] = useState(props.choosenOption);
  const handleAnswering = (option) => {
    dispatch(
      handleSaveQuestionAnswer({
        qid: id,
        answer: option,
        authedUser,
      })
    );
    setChoosenOption(option);
    setHasAnswered(true);
  };

  return (
    <div>
      {hasAnswered === false ? (
        <div className="answer">
          <h1>Poll by {question.author}</h1>
          <img
            src={props.user.avatarURL}
            alt="Poll's creator avatar"
            width={"30px"}
            style={{ display: "inline" }}
          />
          <h2>Would You Rather</h2>
          <div className="options">
            <div className="option-one">
              <p>{question.optionOne.text}</p>
              <button onClick={() => handleAnswering("optionOne")}>
                Click
              </button>
            </div>
            <div className="option-two">
              <p>{question.optionTwo.text}</p>
              <button onClick={() => handleAnswering("optionTwo")}>
                Click
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="answer">
          <h1>Poll by {question.author}</h1>
          <img
            src={props.user.avatarURL}
            alt="Poll's creator avatar"
            width={"20px"}
          />
          <h2>You choose: {question[choosenOption].text}</h2>
          <div className="options">
            <p>
              {question[choosenOption].votes.length} people choose this option
            </p>
            <p>
              {(question[choosenOption].votes.length / 4) * 100}% of people
              choose this option
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;
  var hasAnswered = false;
  var choosenOption = null;
  if (id in users[authedUser].answers) {
    hasAnswered = true;
    choosenOption = users[authedUser].answers[id];
  }
  return {
    id,
    authedUser,
    question: questions[id],
    user: users[questions[id].author],
    hasAnswered,
    choosenOption,
  };
};

export default withRouter(connect(mapStateToProps)(Choices));
