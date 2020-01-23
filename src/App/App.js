import React, { Component } from 'react';
import './App.css';
import '../Search/Search.css';
import { Route, Switch } from 'react-router-dom';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Result from '../Result/Result';
import Header from '../Header/Header';
import data from '../skiData.json';

console.log(data);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      previousSearch: '',
      currentResults: [],
      initialSkiData: data,
      weatherData: [],
      selectedResort: ''
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
      [event.target.id]: event.target.value
    });
  };

  setSelectedResort = selectedResort => {
    this.setState({
      selectedResort: selectedResort
    });
  };

  // resetSearch = () => {
  //   this.setState({
  //     searchString: ''
  //   });
  // };

  render() {
    return (
      <>
        <Header
          searchString={this.state.searchString}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
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
                  />
                );
              }}
            />
            <Route
              path="/results"
              render={() => {
                return (
                  <Results
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
