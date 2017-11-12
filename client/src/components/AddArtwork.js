import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ArtworkForm from './ArtworkForm';
import Uploader from './Uploader';

class AddArtwork extends Component {
  state = { showUploader: false };

  renderContent() {
    if (this.state.showUploader) {
      return (
        <Uploader
          onCancel={() => this.setState({ showUploader: false })}
        />
      );
    }

    return (
      <ArtworkForm 
        onUpload={() => this.setState({ showUploader: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'AddArtworkForm'
})(AddArtwork);
