import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import AddArtwork from './AddArtwork';
import ShowArtwork from './ShowArtwork';
import Login from './Login';
import Admin from './Admin';
import IndexArtwork from './IndexArtwork';
const Landing = () => <h2>Landing</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/artwork" component={IndexArtwork} />
              <Route exact path="/artwork/add" component={AddArtwork} />
              <Route exact path="/artwork/:id" component={ShowArtwork} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
