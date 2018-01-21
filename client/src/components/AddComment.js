import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createComment } from '../actions';

class AddComment extends Component {
  // TEXT INPUT FIELD
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
  onSubmit(text) {
    const { createComment, history } = this.props;
    const { id, artwork_id } = this.props.match.params;

    createComment(id, artwork_id, text, history);
  }

  // RENDER ADD COMMENT FORM COMPONENT
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Comment"
            name="text"
            component={this.renderField}
          />
          <button 
            type="submit" 
            className="waves-light waves-effect btn"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'AddCommentForm'
})(
  connect(null, { createComment })(withRouter(AddComment))
);
