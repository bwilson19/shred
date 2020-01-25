import React, { Component } from 'react';
import './Result.css';
import noMapImage from '../images/noMapImage.png';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomClass: 'zoomOut'
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
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.props.selectedResort.lat}&lon=${this.props.selectedResort.long}&units=imperial&APPID=${key}`;

    if (!this.props.weatherData.data) {
      fetch(weatherUrl)
        .then(response => response.json())
        .then(response => {
          this.props.setWeather(
            response,
            response.weather[0],
            response.main,
            response.wind
          );
        })
        .catch(err => {
          alert(err);
        });
    }
  }

  componentWillUnmount() {
    this.props.setSelectedResort('', '', '', '', '');
    this.props.setWeather('', '', '', '');
  }

  zoomToggle = () => {
    if (this.state.zoomClass === 'zoomOut') {
      this.setState({
        zoomClass: 'zoomIn'
      });
    } else {
      this.setState({
        zoomClass: 'zoomOut'
      });
    }
  };

  render() {
    const resort = this.props.selectedResort.data;
    const maps = this.props.selectedResort.maps;
    const region = this.props.selectedResort.regions;

    const weather = this.props.weatherData;
    const weatherIconURL = `http://openweathermap.org/img/wn/${weather.condition.icon}.png`;

    // unix time converter below from https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

    function timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time =
        month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
      return time;
    }
    const convertedTime = timeConverter(weather.data.dt);

    return (
      <div className="resultWindow">
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
        {this.props.weatherData && (
          <div className="weatherWindow">
            <h1>Weather Report (Updated {convertedTime})</h1>
            <div className="weatherContent">
              <div>
                <table>
                  <thead>
                    <th>Station Name</th>
                    <th>Current Temperature</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Wind Speed</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{weather.data.name}</td>
                      <td>{weather.temp.temp}&#8457;</td>
                      <td>{weather.temp.temp_max}&#8457;</td>
                      <td>{weather.temp.temp_min}&#8457;</td>
                      <td>{weather.wind.speed} mph</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="currentCondition">
                <h2>Current Conditions</h2>
                {weather.condition.icon && (
                  <img
                    className="weatherLogo"
                    src={weatherIconURL}
                    alt={weather.condition.main}
                  />
                )}
                <h2>{weather.condition.main}</h2>
              </div>
            </div>
          </div>
        )}
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
