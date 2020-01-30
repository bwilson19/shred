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
      if (min < 10) {
        var time = month + ' ' + date + ', ' + year + ' ' + hour + ':0' + min;
      } else {
        time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min;
      }
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
                <li> Resort Opened in {resort.opening_year}</li>
              )}
              {resort.top_elevation && (
                <li>
                  Peak Elevation: {Math.floor(resort.top_elevation * 3.28084)}'
                </li>
              )}
              {resort.longest_run && (
                <li>
                  Longest Run: {Math.floor(resort.longest_run * 3.28084)}'
                </li>
              )}
              {resort.run_count && <li>Runs: {resort.run_count}</li>}
              {resort.lift_count && <li>Chair Lifts: {resort.lift_count} </li>}
              {resort.skiable_acreage && (
                <li>Skiable Area: {resort.skiable_acreage} Acres </li>
              )}
              {resort.annual_snowfall && (
                <li>
                  Average Yearly Snowfall:{' '}
                  {Math.floor(resort.annual_snowfall * 0.393701)}"
                </li>
              )}
            </ul>
            {resort.official_website && (
              <a href={resort.official_website} target="blank">
                <button>Resort Website</button>
              </a>
            )}
          </div>
          <div onClick={this.zoomToggle} className="skiMap">
            {maps && <img src={maps} alt={resort.name} />}
            {!maps && <img src={noMapImage} alt="No map found" />}
          </div>
        </div>
        {this.props.weatherData && (
          <div className="weatherWindow">
            <div className="weatherContent">
              <div>
                <h1>Current Weather (Updated {convertedTime})</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Station Name</th>
                      <th>Current Temperature</th>
                      <th>High</th>
                      <th>Low</th>
                      <th>Wind Speed</th>
                    </tr>
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
