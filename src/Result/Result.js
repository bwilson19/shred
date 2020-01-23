import React, { Component } from 'react';
import './Result.css';

class Result extends Component {
  componentDidMount() {
    const url = `https://skimap.org/SkiAreas/view/${this.props.match.params.id}.json`;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.props.setSelectedResort(
          response,
          response.ski_maps[0].media.image.url,
          response.regions[0].name
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentWillUnmount() {
    this.props.setSelectedResort('');
  }

  render() {
    const resort = this.props.selectedResort.data;
    const maps = this.props.selectedResort.maps;
    const region = this.props.selectedResort.regions;
    console.log(region);
    return (
      <div className="resultWindow">
        <h1>{resort.name}</h1>
        <h2>{region}</h2>
        <ul>
          <li>Elevation: {resort.top_elevation}</li>
        </ul>
        <img src={maps} alt={resort.name} />
      </div>
    );
  }
}

export default Result;
