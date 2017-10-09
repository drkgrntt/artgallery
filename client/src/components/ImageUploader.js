import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class ImageUploader extends Component {
  render() {
    return (
      <ImagesUploader
        url="http://localhost:3000/artwork/add"
        optimisticPreviews
        multiple={false}
        onLoadEnd={ (err) => {
          if (err) {
            console.log(err);
          }
        } }
        label="Upload Artwork!"
      />
    );
  }
}

export default ImageUploader;
