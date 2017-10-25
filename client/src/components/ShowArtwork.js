import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPiece } from '../actions';

class ShowArtwork extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPiece(id);
  }

  render() {
    const { piece } = this.props;

    if (!piece) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="row">
        <div className="col s2"></div>
        <div className="col s8">
          <div className="card">
            <div className="card-image">
              <img src={piece.image} />
              <span 
                className="card-title"
                style={{ textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}
              >
                By {piece.artist}
              </span>
            </div>
            <div className="card-content">
              <p>{piece.description}</p>
            </div>
            <div className="card-action">
              <Link to="/artwork">Back to the Gallery</Link>
            </div>
          </div>
        </div>
        <div className="col s2"></div>
      </div>
    );
  }
}

const mapStateToProps = ({ artwork }, ownProps) => {
  return { piece: artwork[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchPiece })(ShowArtwork);
