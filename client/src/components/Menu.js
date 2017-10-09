import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className="ui tabular pointing menu">
        <Link to="#" className="item">Kindergarten</Link>
        <Link to="#" className="item">1st Grade</Link>
        <Link to="#" className="item">2nd Grade</Link>
        <Link to="#" className="item">3rd Grade</Link>
        <Link to="#" className="item">4th Grade</Link>
        <Link to="#" className="item">5th Grade</Link>
      </div>
    );
  }
}

export default Menu;
