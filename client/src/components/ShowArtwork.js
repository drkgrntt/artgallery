import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import AddComment from './AddComment';
import { fetchPiece, deletePiece, deleteComment } from '../actions';

class ShowArtwork extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPiece(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    const { history, deletePiece } = this.props;

    deletePiece(id, history);
  }

  onDeleteCommentClick(comment) {
    const pieceId = this.props.match.params.id;
    const commentId = comment._id;
    const { history, deleteComment, } = this.props;

    deleteComment(pieceId, commentId, history);
  }

  renderCommentOwnership(comment) {
    const { auth } = this.props;

    if (auth.name === comment.author.name || auth.isAdmin) {
      return (
        <a 
          className="red-text"
          style={{ cursor: 'pointer' }}
          onClick={this.onDeleteCommentClick.bind(this, comment)}
        >
          Delete Comment
        </a>
      );
    }

    return;
  }

  renderComments() {
    const { comments } = this.props.piece;

    if (!comments) {
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

  renderAdminContent() {
    switch (this.props.auth && this.props.auth.isAdmin) {
      case null:
        return;
      case false:
        return;
      default:
        return (
          <a
            className="right"
            style={{ cursor: 'pointer' }}
            onClick={this.onDeleteClick.bind(this)}
          >
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
              <p>{piece.description}</p>
            </div>
            <div className="card-action">
              <Link to="/artwork">Back to the Gallery</Link>
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

const mapStateToProps = ({ artwork, auth }, ownProps) => {
  return { piece: artwork[ownProps.match.params._id], auth };
}

export default connect(mapStateToProps, { fetchPiece, deletePiece, deleteComment })(withRouter(ShowArtwork));
