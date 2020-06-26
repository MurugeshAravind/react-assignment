import React, { useState } from "react";
import store from "../store";
import { Redirect } from "react-router-dom";

function Login(props) {
  console.log(props.loginProps)
  const initialState = {
    email: "",
    password: ""
  }
  const [loginData, setLoginData] = useState(initialState)
  const [isSubmit, setIsSubmit] = useState(false);
  const [isValidationError, setIsValidationError] = useState(false);
  const [isFormError, setIsFormError] = useState(false);
  let loginProps = props.loginProps
  function handleLogin(e) {
    e.preventDefault();
    console.log('loginData-->', loginData)
    if (loginData.email !== "" && loginData.password !== "") {
      loginValidation()
    } else {
      setIsSubmit(false)
      setIsFormError(true)
      setTimeout(() => {
        setIsFormError(false)
      }, 1500);
    }
  }

  function loginValidation() {
    console.log(loginProps)
    let emailData = loginProps.filter(x => ((x.email) === (loginData.email)))
    let passwordData = loginProps.filter(x => ((x.password) === (loginData.password)))
    if (emailData.length > 0 && passwordData.length > 0) {
      console.log(emailData)
      console.log(passwordData)
      if (emailData.some(x => x.email === loginData.email) && passwordData.some(x => x.password === loginData.password)) {
        console.log('success')
        setIsSubmit(true)
        setTimeout(() => {
          setIsSubmit(false)
        }, 1500);
        var action = {
          type: "LOGIN",
          payload: loginProps.find(x => x.email === loginData.email)
        }
        store.dispatch(action)
      } else {
        console.log('failure')
        setIsSubmit(false)
        setIsValidationError(true)
        setTimeout(() => {
          setIsValidationError(false)
        }, 1500);
      }
    } else {
      console.log('failure');
      setIsSubmit(false)
      setIsValidationError(true)
      setTimeout(() => {
        setIsValidationError(false)
      }, 1500);
    }
    setLoginData(initialState)
  }

  function handleChange(e) {
    const { value, name } = e.target
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  return (
    <div className="text-left w-75 mx-auto p-3">
      <p className="alert alert-danger text-center" style={{ display: isFormError ? 'block' : 'none' }}>Kindly fill all the fields to submit!</p>
      <p className="alert alert-danger text-center" style={{ display: isValidationError ? 'block' : 'none' }}>Kindly enter valid details to submit!</p>
      <p className="alert alert-success text-center" style={{ display: isSubmit ? 'block' : 'none' }}>Logged in successfully!</p>
      <div className="jumbotron">
        <div className="container">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="email"
                onChange={handleChange}
                value={loginData.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                value={loginData.password}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
      {isSubmit ? <Redirect to="/home"/> : null}
    </div>
  );
}

export default Login;