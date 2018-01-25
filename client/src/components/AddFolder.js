import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createFolder } from '../actions';
import FileInput from './FileInput';
import TextEditor from './TextEditor';

class AddFolder extends Component {
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
    const { createFolder, history } = this.props;

    createFolder(values, history);
  }

  // RENDER ADD ARTWORK FORM COMPONENT
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="card-panel">
        <h4>Create a Gallery!</h4>
        <form encType="multipart/form-data" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Upload Gallery Image"
            name="image"
            component={FileInput}
          />
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Description"
            name="description"
            component={TextEditor}
          />
          <div style={{ marginTop: '20px' }}>
            <button 
              type="submit" 
              className="waves-light waves-effect btn"
            >
              Submit
            </button>
            <Link 
              to='/gallery'
              style={{ margin: '0 5px' }} 
              className="waves-light waves-effect btn"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'AddFolderForm'
})(
  connect(null, { createFolder })(withRouter(AddFolder))
);
