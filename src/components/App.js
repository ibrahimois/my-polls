import React, { useEffect } from "react";
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Choices from "./Choices";
import Login from "./Login";
import LoadingBar from "react-redux-loading-bar"
import { Routes, Route } from "react-router-dom";
import New from "./New";
import Leaderboard from "./Leaderboard";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData())
  }, [])

  return (
    <>
      {props.authedUser ?
        <>
          <LoadingBar />
          <div className="app">
            <Navbar />
            {props.loading === true ? null :
              <Routes>
                <Route path="/" exact element={
                  <Dashboard />
                } />
                <Route path="/answer/:id" element={
                  <Choices />
                } />
                <Route path="/new" element={
                  <New />
                } />
                <Route path="/leaderboard" element={
                  <Leaderboard />
                } />
              </Routes>
            }
          </div>
        </>
        :
        <Login />
      }
    </>
  );
}

const mapStateToProps = ({ authedUser }) => (
  {
    loading: authedUser === null,
    authedUser
  }
)

export default connect(mapStateToProps)(App);
