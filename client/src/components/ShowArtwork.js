import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import renderHTML from 'react-render-html';
import AddComment from './AddComment';
import { fetchPiece, deletePiece, deleteComment } from '../actions';

class ShowArtwork extends Component {
  // FETCH INDIVIDUAL PIECE OF ART TO EXPAND
  componentDidMount() {
    const { id, artwork_id } = this.props.match.params;
    
    this.props.fetchPiece(id, artwork_id);
  }

  // HANDLE DELETE PIECE (AVAILABLE TO ADMIN ONLY)
  onDeleteClick() {
    const { id, artwork_id } = this.props.match.params;
    const { history, deletePiece } = this.props;

    deletePiece(id, artwork_id, history);
  }

  // HANDLE DELETE COMMENT (AVAILABLE TO COMMENT OWNER AND ADMIN)
  onDeleteCommentClick(comment) {
    const { id, artwork_id } = this.props.match.params;
    const comment_id = comment._id;
    const { history, deleteComment, } = this.props;

    deleteComment(id, artwork_id, comment_id, history);
  }

  // MAKE DELETE AND EDIT COMMENT BUTTONS VISIBLE ONLY TO COMMENT OWNER AND ADMIN
  renderCommentOwnership(comment) {
    const { id, artwork_id } = this.props.match.params;
    const comment_id = comment._id;
    const { auth } = this.props;

    if (auth.name === comment.author.name || auth.isAdmin) {
      return (
        <div style={{ display: 'inline' }}>
          <a 
            className="red-text"
            style={{ cursor: 'pointer' }}
            onClick={this.onDeleteCommentClick.bind(this, comment)}
          >
            Delete Comment
          </a>
          <Link
            to={`/gallery/${id}/artwork/show/${artwork_id}/update/${comment_id}`}
            className="orange-text"
            style={{ cursor: 'pointer', margin: '15px' }}
          >
            Edit Comment
          </Link>
        </div>
      );
    }

    return;
  }

  // RENDER DISPLAY OF EACH COMMENT BELONGING TO THE FETCHED PIECE
  renderComments() {
    const { comments } = this.props.piece;

    if (comments == false) {
      return (
        <span>Be the first to leave a comment!</span>
      );
    }

    return _.map(comments, (comment) => {
      return [
        <div key={comment.id}>
          <span>
            {comment.text}
          </span>
          <br />
          {this.renderCommentOwnership(comment)}
          <span className="right" style={{ fontStyle: 'italic' }}>
            {comment.author.name}
          </span>
          <br />
          <hr />
        </div>
      ];
    });
  }

  // RENDER LOGIN LINK OR COMMENT FORM
  renderLoggedInContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">Log in to comment!</a>;
      default:
        return <AddComment />;
    }
  }

  // RENDER EDIT AND DELETE BUTTONS FOR THE ARTWORK PIECE
  // VISIBLE ONLY TO ADMIN
  renderAdminContent() {
    switch (this.props.auth && this.props.auth.isAdmin) {
      case null:
        return;
      case false:
        return;
      default:
        const { id, artwork_id } = this.props.match.params;
    
        return (
          <div style={{ display: "inline" }}>
            <a
              className="right red-text"
              style={{ cursor: 'pointer' }}
              onClick={this.onDeleteClick.bind(this)}
            >
              Delete Piece
            </a>
            <Link
              to={`/gallery/${id}/artwork/update/${artwork_id}`}
              className="right"
            >
              Edit Piece
            </Link>
          </div>
        );
    }
  }

  // RENDER SHOW PAGE FOR SELECTED PIECE OF ART
  render() {
    const { piece } = this.props;
    const { id } = this.props.match.params;

    if (!piece) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col l2"></div>
        <div className="col l8 m12">
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
              <p>{renderHTML(piece.description)}</p>
            </div>
            <div className="card-action">
              <Link to={`/gallery/${id}/artwork`}>Back to the Gallery</Link>
              {this.renderAdminContent()}
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="card-panel">
                {this.renderComments()}
                {this.renderLoggedInContent()}
              </div>
            </div>
          </div>
        </div>
        <div className="col m2"></div>
      </div>
    );
  }
}

// TURN SELECTED PIECE AND CURRENT USER INTO PROPS
const mapStateToProps = ({ artwork, auth }, ownProps) => {
  return { piece: artwork[ownProps.match.params._id], auth };
};

export default connect(mapStateToProps, { fetchPiece, deletePiece, deleteComment })(withRouter(ShowArtwork));
