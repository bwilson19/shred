import React, { Component } from 'react';
import './Results.css';
import { Link } from 'react-router-dom';

class Results extends Component {
  render() {
    let results = this.props.currentResults.map(results => {
      return (
        <div className="results" key={results.SkiArea.id}>
          <Link to={`/result/${results.SkiArea.id}`}>
            {results.Region[0] !== undefined && (
              <p>
                {results.SkiArea.name} ({results.Region[0].name})
              </p>
            )}
          </Link>
        </div>
      );
    });
    return (
      <div className='resultsContainer'>
      <div className="resultsWindow">
        <div className="resultsSubheader">
          <h3>
            Found {this.props.currentResults.length} results for "
            {this.props.previousSearch}"
          </h3>
        </div>
        <div className="resultsList">{results}</div>
      </div>
      </div>
    );
  }
}

export default Results;
