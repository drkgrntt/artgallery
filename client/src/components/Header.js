import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  // VISIBLE ONLY TO ADMIN USERS
  renderAdminContent() {
    switch (this.props.auth && this.props.auth.isAdmin) {
      case null:
        return;
      case false:
        return;
      default:
        return [
          <li key="1" style={{ margin: '0 10px' }}>Admin View Enabled</li>,
          <li key="2"><Link to="/artwork/add">Add Art</Link></li>
        ];
    }
  }
  
  // CHECK IF USER IS LOGGED IN
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        );
      default:
        return [
          <li key="a" style={{ margin: '0 10px' }}>Logged in as {this.props.auth.name}</li>,
          <li key="b"><a href="/api/logout">Logout</a></li>
        ];
    }
  }
  
  // RENDER HEADER
  render() {
    return (
      <nav>
        <div className="nav-wrapper container">
          <Link to="/artwork" className="left brand-logo">Art Gallery</Link>
          <ul className="right hide-on-med-and-down">
            {this.renderAdminContent()}
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// FOR LOGIN CHECK
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
