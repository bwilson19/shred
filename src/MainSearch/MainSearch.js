import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainSearch.css';

class MainSearch extends Component {
  render() {
    return (
      <>
        <div className="searchInfo">
          <h1>Shred</h1>
        </div>
        <div className="searchWindow">
          <div>
            <h3>
              Gather real-time information about 1000's of ski resorts around
              the world.<br></br>Start your search below!
            </h3>
          </div>
          <div>
            <form className="searchBar">
              <input
                type="text"
                placeholder="Search by Resort, State or Country"
                value={this.props.searchString}
                onChange={this.props.handleChange}
                onInput={this.props.handleSubmit}
              />
              {this.props.currentResults.length > 1 && this.props.searchString && (
                <Link to={`/results/${this.props.searchString}`}>
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
                  0 results found, please update your search to a region (ex.
                  "California") or the name of the resort (ex. "Squaw Valley").
                </p>
              )}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default MainSearch;
