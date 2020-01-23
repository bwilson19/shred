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
          {this.props.currentResults.length > 1 && (
            <Link to="/results">Test</Link>
          )}
          {this.props.currentResults.length === 1 && (
            <Link to={`/result/${this.props.currentResults[0].SkiArea.id}`}>
              Test
            </Link>
          )}
          {this.props.currentResults.length === 0 && (
            <p>
              No Results Found. Please update your search to region or name of
              resort.
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default Search;
