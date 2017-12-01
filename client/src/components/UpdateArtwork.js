import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateArtwork, fetchPiece } from '../actions';

class UpdateArtwork extends Component {
  // FETCH SELECTED ARTWORK PIECE TO EDIT
  componentDidMount() {
    const { id } = this.props.match.params;
    
    this.props.fetchPiece(id);
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
    const { updateArtwork, history } = this.props;
    const { id } = this.props.match.params;

    updateArtwork(id, values, history);
  }
  
  // RENDER PRE-FILLED ARTWORK FORM
  render() {
    const { handleSubmit } = this.props;
    const { id } = this.props.match.params;
    
    return (
      <div className="card-panel">
        <h4>Edit this piece</h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {/* this field will have a cloudinary url*/}
          <Field
            label="Artwork URL"
            name="image"
            component={this.renderField}
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
            to={`/artwork/show/${id}`}
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

// TURN ARTWORK PIECE INTO A PROP
const mapStateToProps = ({ artwork }, ownProps) => {
  return { 
    piece: artwork[ownProps.match.params._id], 
    // set initial form values from artwork
    initialValues: artwork[ownProps.match.params._id]
  };
};

// FORM CONFIG
const UpdateArtworkForm = reduxForm({
  form: 'UpdateArtworkForm',
  // for asynchronous fetchPiece action
  enableReinitialize: true
})(UpdateArtwork);

export default connect(mapStateToProps, { updateArtwork, fetchPiece })(withRouter(UpdateArtworkForm));
