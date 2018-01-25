import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateFolder, fetchFolder } from '../actions';
import TextEditor from './TextEditor';

class UpdateFolder extends Component {
  // FETCH SELECTED ARTWORK PIECE TO EDIT
  componentDidMount() {
    const { id } = this.props.match.params;
    
    this.props.fetchFolder(id);
  }
  
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
    const { updateFolder, history } = this.props;
    const { id } = this.props.match.params;

    updateFolder(id, values, history);
  }
  
  // RENDER PRE-FILLED ARTWORK FORM
  render() {
    const { handleSubmit } = this.props;
    const { id } = this.props.match.params;
    
    return (
      <div className="card-panel">
        <h4>Edit this Gallery</h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {/* this field will have a cloudinary url*/}
          <Field
            label="Image URL"
            name="image"
            component={this.renderField}
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
              to={`/gallery/${id}/artwork`}
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

// TURN ARTWORK PIECE INTO A PROP
const mapStateToProps = ({ folder }, ownProps) => {
  return { 
    // set initial form values from folder
    initialValues: folder[ownProps.match.params._id]
  };
};

// FORM CONFIG
const UpdateFolderForm = reduxForm({
  form: 'UpdateFolderForm',
  // for asynchronous fetchFolder action
  enableReinitialize: true
})(UpdateFolder);

export default connect(mapStateToProps, { updateFolder, fetchFolder })(withRouter(UpdateFolderForm));
