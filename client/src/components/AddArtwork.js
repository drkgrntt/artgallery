import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createArtwork } from '../actions';
import FileInput from './FileInput';

class ArtworkForm extends Component {
  renderField(field) { 
    return (
      <div className="input-field">
        <input
          placeholder={field.label}
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  onSubmit(values) {
    const { createArtwork, history } = this.props;

    createArtwork(values, history);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form encType="multipart/form-data" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Upload Artwork"
          name="image"
          component={FileInput}
        />
        <Field
          label="Artist"
          name="artist"
          component={this.renderField}
        />
        <Field
          label="Class"
          name="teacher"
          component={this.renderField}
        />
        <Field
          label="Grade"
          name="level"
          component={this.renderField}
        />
        <Field
          label="Description"
          name="description"
          component={this.renderField}
        />
        <button 
          type="submit" 
          className="waves-light waves-effect btn"
        >
          Submit
        </button>
        <Link 
          to="/artwork" 
          style={{ margin: '0 5px' }} 
          className="waves-light waves-effect btn"
        >
          Cancel
        </Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'AddArtworkForm'
})(
  connect(null, { createArtwork })(withRouter(ArtworkForm))
);
