import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import  Menu from './Menu';
import AddArtwork from './AddArtwork';
const Landing = () => <h2>Landing</h2>
const Index = () => <h2>Index</h2>
const ArtWork = () => <h2>ArtWork</h2>

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="ui container">
            <Menu />
            <Route exact path="/" component={Landing} />
            <Route exact path="/artwork" component={Index} />
            <Route exact path="/artwork/add" component={AddArtwork} />
            <Route exact path="/artwork/view/:id" component={ArtWork} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
