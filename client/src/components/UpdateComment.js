import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateComment, fetchComment } from '../actions';

class UpdateComment extends Component {
  // FETCH SELECTED COMMENT
  componentDidMount() {
    const { id, artwork_id, comment_id } = this.props.match.params;
    
    this.props.fetchComment(id, artwork_id, comment_id);
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
  onSubmit(text) {
    const { updateComment, history } = this.props;
    const { id, artwork_id, comment_id } = this.props.match.params;

    updateComment(id, artwork_id, comment_id, text, history);
  }

  // RENDER COMMENT UPDATE FORM
  render() {
    const { handleSubmit } = this.props;
    const { id, artwork_id } = this.props.match.params;

    return (
      <div className="card-panel">
        <h4>Edit Comment</h4>
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
          <Link
            to={`/gallery/${id}/artwork/show/${artwork_id}`}
            className="btn"
            style={{ margin: '13px' }}
          >
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

// TURN SELECTED COMMENT INTO A PROP
const mapStateToProps = ({ comment }, ownProps) => {
  return {
    // set initial form value from selected comment
    initialValues: comment[ownProps.match.params._id]
  };
};

// REDUX FORM CONFIG
const UpdateCommentForm = reduxForm({
  form: 'UpdateCommentForm',
  // for asynchronous fetchComment action
  enableReinitialize: true
})(UpdateComment);

export default connect(mapStateToProps, { fetchComment, updateComment })(withRouter(UpdateCommentForm));
