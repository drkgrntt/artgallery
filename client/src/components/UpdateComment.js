import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateComment, fetchComment } from '../actions';

class UpdateComment extends Component {
  componentDidMount() {
    const { id, comment_id } = this.props.match.params;
    
    this.props.fetchComment(id, comment_id);
  }
  
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
    const { updateComment, history } = this.props;
    const { id, comment_id } = this.props.match.params;

    updateComment(id, comment_id, text, history);
  }

  render() {
    const { handleSubmit } = this.props;
    const { id } = this.props.match.params;

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
            to={`/artwork/show/${id}`}
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

const mapStateToProps = ({ comment }, ownProps) => {
  return {
    comment: comment[ownProps.match.params._id],
    initialValues: comment[ownProps.match.params._id]
  };
};

const UpdateCommentForm = reduxForm({
  form: 'UpdateCommentForm',
  enableReinitialize: true
})(UpdateComment);

export default connect(mapStateToProps, { fetchComment, updateComment })(withRouter(UpdateCommentForm));
