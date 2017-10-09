import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createArtwork } from '../actions';

class AddArtwork extends Component {
  renderField(field) { 
    return (
      <div>
        <label className="ui label">{field.label}</label>
        <input
          className="ui input"
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  onSubmit(values) {
    this.props.createArtwork(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Artwork"
          name="artwork"
          component={this.renderField}
        />
        <Field
          label="Artist"
          name="artist"
          component={this.renderField}
        />
        <Field
          label="Class"
          name="class"
          component={this.renderField}
        />
        <Field
          label="Grade"
          name="grade"
          component={this.renderField}
        />
        <Field
          label="Description"
          name="description"
          component={this.renderField}
        />
        <button type="submit" className="">Submit</button>
        <Link to="/" className="">Cancel</Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'AddArtworkForm'
})(
  connect(null, { createArtwork })(AddArtwork)
);
