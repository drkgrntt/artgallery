import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import renderHTML from 'react-render-html';
import { fetchFolder, deleteFolder } from '../actions';

class IndexArtwork extends Component {
  // FETCH CURRENT FOLDER
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchFolder(id);
  }

  // DELETE ART GALLERY
  onDeleteClick() {
    const { id } = this.props.match.params;
    const { history, deleteFolder } = this.props;

    deleteFolder(id, history);
  }

  // SHOW ADD/DELETE/UPDATE ARTWORK LINKS
  renderAdminContent() {
    const { id } = this.props.match.params;

    if (this.props.auth && this.props.auth.isAdmin) {
      return (
        <div className="right">
          <a
            className="red-text"
            style={{ cursor: 'pointer' }}
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Gallery
          </a>
          <Link
            to={`/gallery/update/${id}`}
          >
            Edit Gallery
          </Link>
          <Link className="green-text" to={`/gallery/${id}/artwork/add`}>
            Add New Artwork
          </Link>
        </div>
      );
    }
  }
  
  // CARD FOR EACH ARTWORK PIECE
  renderArtworkCard() {
    const { id } = this.props.match.params;
    const { artworks } = this.props.folder;

    if (artworks == false) {
      return <h1>No artwork in this gallery yet!</h1>;
    }
    
    // return one card for each artwork piece
    return _.map(artworks, (art) => {
      return [
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
                <Link to={`/gallery/${id}/artwork/show/${art._id}`}>Expand Artwork</Link>
              </div>
            </div>
          </div>
        </li>
      ];
    }); 
  }
  
  // RENDER INDEX ARTWORK COMPONENT
  render() {
    const { folder } = this.props;

    if (!folder) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="card blue-grey darken-1" style={{ margin: '10px' }}>
          <div className="card-content white-text">
            <span className="card-title">{folder.title}</span>
            <p>{renderHTML(folder.description)}</p>
          </div>
          <div className="card-action">
            <Link to="/gallery">Back to Galleries</Link>
            {this.renderAdminContent()}
          </div>
        </div>
        <ul>
          {this.renderArtworkCard()}
        </ul>
      </div>
    );
  }
}

// PULL FOLDER FROM STATE
const mapStateToProps = ({ folder, auth }, ownProps) => {
  return { folder: folder[ownProps.match.params._id], auth };
};

export default connect(mapStateToProps, { fetchFolder, deleteFolder })(IndexArtwork);
