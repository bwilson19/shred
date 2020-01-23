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
            placeholder="Search by Region or Resort Name"
            value={this.props.searchString}
            onChange={this.props.handleChange}
            onInput={this.props.handleSubmit}
          />
          {this.props.currentResults.length > 1 && (
            <Link to="/results">
              <button>Search</button>
            </Link>
          )}
          {this.props.currentResults.length === 1 && (
            <Link to={`/result/${this.props.currentResults[0].SkiArea.id}`}>
              <button>Search</button>
            </Link>
          )}
          {this.props.currentResults.length === 0 && (
            <p>
              0 results found, please update your search to a region ("California") or the name of the resort ("Squaw Valley").
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default Search;
