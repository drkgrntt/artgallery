import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createArtwork } from '../actions';
import FileInput from './FileInput';

class AddArtwork extends Component {
  // RENDER TEXT INPUT FIELD
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

  // HANDLE SUBMIT
  onSubmit(values) {
    const { createArtwork, history } = this.props;

    createArtwork(values, history);
  }

  // RENDER ADD ARTWORK FORM COMPONENT
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="card-panel">
        <h4>Add a piece of artwork!</h4>
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
      </div>
    );
  }
}

export default reduxForm({
  form: 'AddArtworkForm'
})(
  connect(null, { createArtwork })(withRouter(AddArtwork))
);
