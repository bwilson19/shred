import React, { Component } from 'react';
import './Result.css';
import noMapImage from '../images/noMapImage.png';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomClass: 'hide'
    };
  }

  componentDidMount() {
    const skiUrl = `https://skimap.org/SkiAreas/view/${this.props.match.params.id}.json`;

    fetch(skiUrl)
      .then(response => response.json())
      .then(response => {
        this.props.setSelectedResort(
          response,
          response.ski_maps[0].media.sizes[0].url,
          response.regions[0].name,
          response.latitude,
          response.longitude
        );
      })
      .catch(err => {
        alert(err);
      });
  }

  componentDidUpdate() {
    const key = process.env.REACT_APP_WEATHER_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.props.selectedResort.lat}&lon=${this.props.selectedResort.long}&APPID=${key}`;

    if (!this.props.weatherData.name) {
      fetch(weatherUrl)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.props.setWeather(response);
        })
        .catch(err => {
          alert(err);
        });
    }
  }

  componentWillUnmount() {
    this.props.setSelectedResort('', '', '', '', '');
    this.props.setWeather('');
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
        <div>
          <a href="#weather">Weather</a>
        </div>
        <div className="resultContent">
          <div className="resortInfo">
            <h1>{resort.name}</h1>
            <h2>{region}</h2>
            <ul>
              {resort.opening_year && (
                <li> Resort Opened: {resort.opening_year}</li>
              )}
              {resort.top_elevation && (
                <li>Peak Elevation: {resort.top_elevation}</li>
              )}
              {resort.longest_run && <li>Longest Run: {resort.longest_run}</li>}
              {resort.run_count && <li>Runs: {resort.run_count}</li>}
              {resort.lift_count && <li>Lifts: {resort.lift_count} </li>}
              {resort.skiable_acreage && (
                <li>Acres: {resort.skiable_acreage} </li>
              )}
              {resort.annual_snowfall && (
                <li>Average Yearly Snowfall: {resort.annual_snowfall}</li>
              )}
            </ul>
            <a href={resort.official_website} target="blank">
              <button>Resort Website</button>
            </a>
          </div>
          <div onClick={this.zoomToggle} className="skiMap">
            {maps && <img src={maps} alt={resort.name} />}
            {!maps && <img src={noMapImage} alt="No map found" />}
          </div>
        </div>
        <div id="weather" className="weather">
          <h1>Weather Report</h1>
          <table>
            <thead>
              <tr>{/* <h1>Weather updated at: {this.props</h1> */}</tr>
            </thead>
            <tbody>
              <tr>
                <td>Station Name</td>
                <td>Current Conditions</td>
                <td>Current Temperature</td>
              </tr>
              <tr>
                <td>{this.props.weatherData.name}</td>
                <td></td>
                <td>{this.props.weatherData.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {maps && (
          <div onClick={this.zoomToggle} className={this.state.zoomClass}>
            <img id="zoomedImage" src={maps} alt={resort.name} />
          </div>
        )}
      </div>
    );
  }
}

export default Result;
