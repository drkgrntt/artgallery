import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchPiece, deletePiece } from '../actions';

class ShowArtwork extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPiece(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    const { history } = this.props;

    this.props.deletePiece(id, history);
  }

  renderAdminContent() {
    switch (this.props.auth && this.props.auth.isAdmin) {
      case null:
        return;
      case false:
        return;
      default:
        return (
          <a style={{ cursor: 'pointer' }} onClick={this.onDeleteClick.bind(this)}>
            Delete Piece
          </a>
        );
    }
  }

  render() {
    const { piece } = this.props;

    if (!piece) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col m2"></div>
        <div className="col m8 s12">
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
              {this.renderAdminContent()}
            </div>
          </div>
        </div>
        <div className="col m2"></div>
      </div>
    );
  }
}

const mapStateToProps = ({ artwork }, ownProps) => {
  return { piece: artwork[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchPiece, deletePiece })(withRouter(ShowArtwork));
