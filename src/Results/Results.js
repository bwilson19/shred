import React, { Component } from 'react';
import './Results.css';
import { Link } from 'react-router-dom';

class Results extends Component {
  render() {
    let results = this.props.currentResults.map(results => {
      return (
        <div className="results" key={results.SkiArea.id}>
          <Link to={`/result/${results.SkiArea.id}`}>
            <p>{results.SkiArea.name}</p>
          </Link>
        </div>
      );
    });
    return (
      <div className="resultsWindow">
        <h3>
          {this.props.currentResults.length} Results for "
          {this.props.previousSearch}"
        </h3>
        <div>{results}</div>
      </div>
    );
  }
}

export default Results;
