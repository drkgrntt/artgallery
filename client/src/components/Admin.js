import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeAdmin } from '../actions';

class Admin extends Component {
  // RENDER FORM FIELD
  renderField(field) {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-content">
            <div className="input-field">
              <input
                type="password"
                placeholder="admin code"
                {...field.input}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // HANDLE SUBMIT
  onSubmit(value) {
    const { makeAdmin, history } = this.props;

    makeAdmin(value, history);
  }

  // RENDER ADMIN FORM PAGE
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <div className="col m3"></div>
        <div className="col m6 s12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Become an Admin!</span>
              <p>This page is primarily for admin purposes. 
              Please enter the admin code to gain admin access.</p>
            </div>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="adminCode"
                component={this.renderField}
              />
              <div className="card-action">
                <button type="submit" className="btn">Become an Admin!</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col m3"></div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'AdminForm'
})(
  connect(null, { makeAdmin })(withRouter(Admin))
);
