import React, { Component } from 'react';
import './App.css';
import '../Search/Search.css';
import { Route, Switch } from 'react-router-dom';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Result from '../Result/Result';
import Header from '../Header/Header';
import data from '../skiData.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      previousSearch: null,
      currentResults: [1, 1],
      initialSkiData: data,
      weatherData: [],
      selectedResort: {
        data: '',
        maps: '',
        regions: '',
        lat: '',
        long: ''
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const searchedResults = this.state.initialSkiData.filter(
      result =>
        (result.Region[0] !== undefined &&
          result.Region[0].name
            .toLowerCase()
            .includes(this.state.searchString.toLowerCase())) ||
        result.SkiArea.name
          .toLowerCase()
          .includes(this.state.searchString.toLowerCase())
    );
    this.setState({
      currentResults: searchedResults,
      previousSearch: this.state.searchString,
      searchString: ''
    });
  };

  handleChange = event => {
    this.setState({
      searchString: event.target.value
    });
  };

  setSelectedResort = (selectedResort, maps, regions, lat, long) => {
    this.setState({
      selectedResort: {
        data: selectedResort,
        maps: maps,
        regions: regions,
        lat: lat,
        long: long
      }
    });
  };

  render() {
    return (
      <>
        <Header
          searchString={this.state.searchString}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          currentResults={this.state.currentResults}
          previousSearch={this.state.previousSearch}
        />
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Search
                    searchString={this.state.searchString}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    currentResults={this.state.currentResults}
                  />
                );
              }}
            />
            <Route
              path="/results"
              render={routerProps => {
                return (
                  <Results
                    match={routerProps.match}
                    currentResults={this.state.currentResults}
                    previousSearch={this.state.previousSearch}
                  />
                );
              }}
            />
            <Route
              path="/result/:id"
              render={routerProps => {
                return (
                  <Result
                    match={routerProps.match}
                    selectedResort={this.state.selectedResort}
                    setSelectedResort={this.setSelectedResort}
                  />
                );
              }}
            ></Route>
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
