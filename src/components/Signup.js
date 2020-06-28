import React, { useState } from 'react';
import store from '../store';

function Signup() {
  const initialState = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleChanges(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleSignup(e) {
    e.preventDefault();
    console.log('Form data after submit-->', formData);
    if (
      formData.email !== '' &&
      formData.name !== '' &&
      formData.password !== '' &&
      formData.confirmPassword !== ''
    ) {
      console.log('nothing is empty');
      setIsSubmit(true);
      setTimeout(() => {
        setIsSubmit(false);
      }, 1500);
      var action = {
        type: 'SIGNUP',
        payload: formData,
      };
      store.dispatch(action);
    } else {
      setIsSubmit(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 1500);
    }
    setFormData(initialState);
  }

  return (
    <div className="text-left w-75 mx-auto p-3">
      <p
        className="alert alert-danger text-center"
        style={{ display: isError ? 'block' : 'none' }}
      >
        Kindly fill all the fields to submit!
      </p>
      <p
        className="alert alert-success text-center"
        style={{ display: isSubmit ? 'block' : 'none' }}
      >
        Form is submitted successfully!
      </p>
      <div className="jumbotron">
        <div className="container">
          <form onSubmit={handleSignup}>
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
                onChange={handleChanges}
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">
                <strong>Name:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                aria-describedby="name"
                onChange={handleChanges}
                value={formData.name}
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
                aria-describedby="password"
                onChange={handleChanges}
                value={formData.password}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <strong>Confirm Password:</strong>
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                id="confirmPassword"
                aria-describedby="confirmPassword"
                onChange={handleChanges}
                value={formData.confirmPassword}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
