import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s3"></div>
        <div className="col s6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Login with Google!</span>
              <p>By logging in, you'll able to comment 
              on any of the artwork. Only the first name 
              associated with your Google account will 
              be displayed.</p>
            </div>
            <div className="card-action">
              <a href="/auth/google">Login</a>
            </div>
          </div>
        </div>
        <div className="col s3"></div>
      </div>
    );
  }
}

export default Login;
