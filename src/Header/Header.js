import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';

class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/">
          <h1>SkiBase</h1>
        </Link>
        <nav>
          <Search
            searchString={this.props.searchString}
            handleChange={this.props.handleChange}
            handleSubmit={this.props.handleSubmit}
          />
          <ul>
            <li>Login</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
