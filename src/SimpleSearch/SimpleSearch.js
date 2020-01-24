import React, { Component } from 'react';
import '../MainSearch/MainSearch.css';
import './SimpleSearch.css';

class SimpleSearch extends Component {
  render() {
    return (
      <>
        <div className="searchWindow">
          <div>
            <form className="searchBar">
              <input
                type="text"
                placeholder="Search by Resort, State or Country"
                value={this.props.searchString}
                onChange={this.props.handleChange}
              />
              <button onClick={this.props.handleSubmit}>Search</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SimpleSearch;
