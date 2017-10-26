import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchArtwork } from '../actions';

class IndexArtwork extends Component {
  componentDidMount() {
    this.props.fetchArtwork();
  }

  renderArtworkCard() {
    if (!this.props.artwork) {
      return <h1>No artwork yet!</h1>
    }

    return _.map(this.props.artwork, (art) => {
      return (
        <li key={art._id}>
          <div className="col s12 m6 l3">
            <div className="card">
              <div className="card-image">
                <img src={art.image} />
              </div>
              <div className="card-content">
                <p>{art.artist}</p>
                <p>Grade: {art.level}</p>
                <p>Teacher: {art.teacher}</p>
              </div>
              <div className="card-action">
                <Link to={`/artwork/show/${art._id}`}>Expand Artwork</Link>
              </div>
            </div>
          </div>
        </li>
      );
    }); 
  }

  render() {
    return (
      <div className="row">
        <ul>
          {this.renderArtworkCard()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { artwork: state.artwork };
}

export default connect(mapStateToProps, { fetchArtwork })(IndexArtwork);
