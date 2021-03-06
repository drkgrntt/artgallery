import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  // RENDER INTRODUCTION CARD FOR LANDING PAGE
  render() {
    return (
      <div className="row">
        <div className="col m3"></div>
        <div className="col s12 m6" style={{ textAlign: 'center' }}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Welcome to the Luff Art Club Gallery!</span>
              <p>
                This is where all of the art created in 
                the Luff Elementary Art Club is showcased. 
                Feel free to log in with your google account 
                to leave a comment on a piece of art. Enjoy!
              </p>
            </div>
            <div className="card-action">
              <Link to="/gallery">Continue to the Gallery!</Link>
            </div>
          </div>
        </div>
        <div className="col m3"></div>
      </div>    
    );
  }
}

export default Landing;
