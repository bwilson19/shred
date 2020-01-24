import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/">
          <h1>Shred</h1>
        </Link>
        <nav>
          <ul>
            <Link to="/"><li>Search</li></Link>
            <li>Login</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
