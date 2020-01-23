import React, { Component } from 'react';
import './Result.css';

class Result extends Component {
  componentDidMount() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `https://skimap.org/SkiAreas/view/${this.props.match.params.id}.json`;
    fetch(proxyUrl + targetUrl)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.props.setSelectedResort(response);
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentWillUnmount() {
    this.props.setSelectedResort('');
  }

  render() {
    return (
      <div className="ResultWindow">
        <h1>Result</h1>
      </div>
    );
  }
}

export default Result;
