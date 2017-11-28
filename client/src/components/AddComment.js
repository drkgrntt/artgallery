import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createComment } from '../actions';

class AddComment extends Component {
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

  onSubmit(text) {
    const { createComment, history } = this.props;
    const { id } = this.props.match.params;

    createComment(id, text, history);
  }

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
