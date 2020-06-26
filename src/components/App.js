import React, { useState, useEffect } from "react";
import "../styles.css";
import { Link, Route, Redirect, Switch } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import store from "../store";

var signupDetails = [];
var loginDetails;
var loginName;

export default function App() {
  const [name, setName] = useState(false)
  function getSignupDetails() {
    store.subscribe(() => {
      signupDetails.push(store.getState().data)
    })
  }

  function getLoginDetails() {
    store.subscribe(() => {
      loginDetails = (store.getState().loginData)
      console.log('loginDetails-->', loginDetails)
      if (loginDetails) {
        setName(true)
        loginName = loginDetails.name;
      }
    })
  }
  useEffect(() => {
    getSignupDetails()
    getLoginDetails()
    return () => {
      setName(false)
    }
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/home">
          Assignment 2
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" style={{ display: name ? 'none' : 'block' }}>
              <Link className="nav-link" to="/signup">
                <PersonIcon /> Signup
              </Link>
            </li>
            <li className="nav-item" style={{ display: name ? 'none' : 'block' }}>
              <Link className="nav-link" to="/login">
                <ExitToAppIcon /> Login
              </Link>
            </li>
            <li className="nav-item" style={{ display: name ? 'block' : 'none' }}>
              <Link className="nav-link" to="/home">
                {loginName}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" render={() => <Home homeProps={loginDetails} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" render={() => <Login loginProps={signupDetails} />} />
      </Switch>
    </div>
  );
}
