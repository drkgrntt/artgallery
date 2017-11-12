import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import AddArtwork from './AddArtwork';
import ShowArtwork from './ShowArtwork';
import Admin from './Admin';
import IndexArtwork from './IndexArtwork';
import Landing from './Landing';

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
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/artwork" component={IndexArtwork} />
              <Route exact path="/artwork/show/:id" component={ShowArtwork} />
              <Route exact path="/artwork/add" component={AddArtwork} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
