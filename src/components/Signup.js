import React from "react";

export default function Signup() {
  function handleSignup(e) {
    e.preventDefault();
  }
  return (
    <div className="text-left w-75 mx-auto p-3">
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm password">
                <strong>Confirm Password:</strong>
              </label>
              <input
                type="password"
                name="confirm password"
                className="form-control"
                id="confirm password"
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
