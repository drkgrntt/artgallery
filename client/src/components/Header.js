import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  // VISIBLE ONLY TO ADMIN USERS
  renderAdminContent() {
    if (this.props.auth && this.props.auth.isAdmin) {
      return [
        <li key="1" className="hide-on-med-and-down" style={{ margin: '0 10px' }}>Admin View Enabled</li>,
        <li key="2"><Link to="/gallery/add">Add a Gallery</Link></li>
      ];
    }
  }
  
  // CHECK IF USER IS LOGGED IN
  renderContent() {
    if (this.props.auth) {
      return [
        <li key="a" className="hide-on-med-and-down" style={{ margin: '0 10px' }}>Logged in as {this.props.auth.name}</li>,
        <li key="b" className="hide-on-med-and-down"><a href="/api/logout">Logout</a></li>
      ];
    }

    return <li><a href="/auth/google">Google Login</a></li>;
  }
  
  // RENDER HEADER
  render() {
    return (
      <nav>
        <div className="nav-wrapper container">
          <Link to="/gallery" className="left brand-logo">Art Club Gallery</Link>
          <ul className="right">
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
