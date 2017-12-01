import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchArtwork } from '../actions';

class IndexArtwork extends Component {
  // FETCH ALL ARTWORK
  componentDidMount() {
    this.props.fetchArtwork();
  }
  
  // CARD FOR EACH ARTWORK PIECE
  renderArtworkCard() {
    if (!this.props.artwork) {
      return <h1>No artwork yet!</h1>;
    }
    
    // return one card for each artwork piece
    return _.map(this.props.artwork, (art) => {
      return (
        <li key={art._id}>
          <div className="col s12 m6 l3">
            <div className="card hoverable">
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
  
  // RENDER INDEX ARTWORK COMPONENT
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

// PULL ARTWORK FROM STATE
const mapStateToProps = (state) => {
  return { artwork: state.artwork };
};

export default connect(mapStateToProps, { fetchArtwork })(IndexArtwork);
