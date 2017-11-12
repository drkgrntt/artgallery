import React, { Component } from 'react';
import { FileUpload } from 'redux-file-upload';
import { connect } from 'react-redux';

class Uploader extends Component {
  render() {
    const { onCancel } = this.props;

    return (
      <div>
        This is for the uploader.
      </div>
    );
  }
}

export default Uploader;
