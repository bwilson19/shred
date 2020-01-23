import React, { Component } from 'react';
import './Results.css';
import Result from '../Result/Result';

class Results extends Component {
  render() {
    let results = this.props.currentResults.map(results => {
      return (
        <div className="results" key={results.SkiArea.id}>
          <p>{results.SkiArea.name}</p>
        </div>
      );
    });
    return <div className="resultsWindow">{results}</div>;
  }
}

export default Results;
