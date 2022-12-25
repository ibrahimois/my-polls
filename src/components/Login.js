import React, { useState } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { handleSetAuthedUser } from "../actions/authedUser";
function Login({ dispatch }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seccuss, setSeccuss] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSeccuss(!seccuss);
    dispatch(handleSetAuthedUser(username));
    if (document.referrer.includes("questions")) {
      navigate("/404");
    } else if (window.history.length > 3) {
      window.history.back();
    } else {
      navigate("/");
    }
  };

  const handleChangeUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePasswordChange = (e) => {
    setPassword(e.target.value);
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
      <h2>Employee Polls</h2>
      <h3>Login</h3>
      <div className="options">
        <label> Username</label>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => handleChangeUsernameChange(e)}
          value={username}
          required
          style={{ width: "150px" }}
        />
        <label> Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => handleChangePasswordChange(e)}
          value={password}
          required
          style={{ width: "150px" }}
        />
      </div>
      <button
        data-testid="submit-button"
        type="submit"
        style={{ width: "150px" }}
      >
        Login
      </button>
      {seccuss === true ? (
        <div data-testid="success-header">d</div>
      ) : (
        <div data-testid="error-header">x</div>
      )}
    </form>
  );
}

export default connect()(Login);
