import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchFolders } from '../actions';

class IndexFolders extends Component {
  // FETCH ALL FOLDERS
  componentDidMount() {
    this.props.fetchFolders();
  }
  
  // CARD FOR EACH FOLDER
  renderFolderCard() {
    if (this.props.folder == false) {
      return <h1>No galleries yet!</h1>;
    }
    
    // return one card for each folder
    return _.map(this.props.folder, (folder) => {
      return (
        <li key={folder._id}>
          <div className="col s12 m6 l3">
            <div className="card hoverable">
              <div 
                className="card-image art-card"
                style={{ backgroundImage: `url(${folder.image}` }}
              ></div>
              <div className="card-content">
                <p>{folder.title}</p>
              </div>
              <div className="card-action">
                <Link to={`/gallery/${folder._id}/artwork`}>Expand Gallery</Link>
              </div>
            </div>
          </div>
        </li>
      );
    }); 
  }
  
  // RENDER INDEX FOLDER COMPONENT
  render() {
    return (
      <div className="row">
        <h3 style={{ marginLeft: '10px' }}>Project Galleries</h3>
        <ul>
          {this.renderFolderCard()}
        </ul>
      </div>
    );
  }
}

// PULL FOLDER FROM STATE
const mapStateToProps = ({ folder }) => {
  return { folder };
};

export default connect(mapStateToProps, { fetchFolders })(IndexFolders);
