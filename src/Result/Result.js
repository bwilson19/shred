import React, { Component } from 'react';
import './Result.css';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomClass: 'hide'
    };
  }

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

  zoomToggle = () => {
    if (this.state.zoomClass === 'hide') {
      this.setState({
        zoomClass: 'show'
      });
    } else {
      this.setState({
        zoomClass: 'hide'
      });
    }
  };

  render() {
    const resort = this.props.selectedResort.data;
    const maps = this.props.selectedResort.maps;
    const region = this.props.selectedResort.regions;

    return (
      <div className="resultWindow">
        <div className="resultContent">
          <div className="resortInfo">
            <h1>{resort.name}</h1>
            <h2>{region}</h2>
            <h3>Opened: {resort.opening_year}</h3>
            <ul>
              <li>Peak Elevation: {resort.top_elevation}</li>
              <li>Lifts: {resort.lift_count} </li>
              <li>Acres: {resort.skiable_acreage} </li>
              <li>Average Yearly Snowfall: {resort.annual_snowfall}</li>
            </ul>
            <a href={resort.official_website}>
              <button>Resort Website</button>
            </a>
          </div>
          <div onClick={this.zoomToggle} className="skiMap">
            <img src={maps} alt={resort.name} />
          </div>
        </div>
        <div onClick={this.zoomToggle} className={this.state.zoomClass}>
          <img id="zoomedImage" src={maps} alt={resort.name} />
        </div>
      </div>
    );
  }
}

export default Result;
