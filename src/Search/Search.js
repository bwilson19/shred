import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

class Search extends Component {
  render() {
    return (
      <div className="searchWindow">
        <form className="searchBar">
          <input
            type="text"
            id="searchString"
            placeholder="Search by Region or Resort Name"
            value={this.props.searchString}
            onChange={this.props.handleChange}
          />
          <button onClick={this.props.handleSubmit}>Search</button>
          <Link to="/results">Test</Link>
        </form>
      </div>
    );
  }
}

export default Search;
