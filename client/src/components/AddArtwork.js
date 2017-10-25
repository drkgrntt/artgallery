import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createArtwork } from '../actions';

class AddArtwork extends Component {
  renderField(field) { 
    return (
      <div className="row">
        <div className="input-field">
          <input
            placeholder={field.label}
            type="text"
            {...field.input}
          />
        </div>
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
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Artwork"
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
        <button type="submit" className="waves-light waves-effect btn">Submit</button>
        <Link to="/" style={{ margin: '0 5px' }} className="waves-light waves-effect btn">Cancel</Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'AddArtworkForm'
})(
  connect(null, { createArtwork })(withRouter(AddArtwork))
);
