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
import UpdateArtwork from './UpdateArtwork';
import UpdateComment from './UpdateComment';
import IndexFolders from './IndexFolders';
import AddFolder from './AddFolder';
import UpdateFolder from './UpdateFolder';

class App extends Component {
  // FETCH CURRENT USER
  componentDidMount() {
    this.props.fetchUser();
  }
  
  // RENDER VIRTUAL DOM
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {this.renderAdmin}
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/gallery" component={IndexFolders} />
              <Route exact path="/gallery/add" component={AddFolder} />
              <Route exact path="/gallery/update/:id" component={UpdateFolder} />
              <Route exact path="/gallery/:id/artwork" component={IndexArtwork} />
              <Route exact path="/gallery/:id/artwork/show/:artwork_id" component={ShowArtwork} />
              <Route exact path="/gallery/:id/artwork/update/:artwork_id" component={UpdateArtwork} />
              <Route exact path="/gallery/:id/artwork/show/:artwork_id/update/:comment_id" component={UpdateComment} />
              <Route exact path="/gallery/:id/artwork/add" component={AddArtwork} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
