import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/shared";

function New({ dispatch }) {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOne, optionTwo));
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  const handleChangeOptionOne = (e) => {
    setOptionOne(e.target.value);
  };

  const handleChangeOptionTwo = (e) => {
    setOptionTwo(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2>Would You Rather</h2>
      <h3>Create Your Own Poll</h3>
      <div className="options">
        <label> First Option</label>
        <input
          type="text"
          placeholder="Option One"
          onChange={(e) => handleChangeOptionOne(e)}
          value={optionOne}
          required
          style={{ width: "150px" }}
        />
        <label> Second Option</label>
        <input
          type="text"
          placeholder="Option Two"
          onChange={(e) => handleChangeOptionTwo(e)}
          value={optionTwo}
          required
          style={{ width: "150px" }}
        />
      </div>
      <button type="submit" style={{ width: "150px" }}>
        Submit
      </button>
    </form>
  );
}

export default connect()(New);
