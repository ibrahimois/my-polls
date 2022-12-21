import React, { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Choices from "./Choices";
import Login from "./Login";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import New from "./New";
import Leaderboard from "./Leaderboard";
import NotFound from "./NotFound";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  if (
    props.authedUser === null &&
    window.location.href != "http://localhost:3000/login"
  ) {
    window.location.href = "http://localhost:3000/login";
  }

  return (
    <>
      <LoadingBar />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/questions/:id" element={<Choices />} />
          <Route path="/add" element={<New />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  authedUser,
});

export default connect(mapStateToProps)(App);
