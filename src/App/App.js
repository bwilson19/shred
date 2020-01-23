import React, { Component } from 'react';
import './App.css';
import '../Search/Search.css';
import { Route, Switch } from 'react-router-dom';
import Search from '../Search/Search';
import Results from '../Results/Results';
import Header from '../Header/Header';
import data from '../example.json';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
  targetUrl = 'https://skimap.org/SkiAreas/index.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      currentResults: [],
      skiData: data,
      weatherData: []
    };
  }

  // componentDidMount() {
  //   fetch(proxyUrl + targetUrl)
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response)
  //       this.setState({
  //         skiData: response
  //       })
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  handleSubmit = event => {
    event.preventDefault();
    const searchedResults = this.state.skiData.filter(data =>
      data.Region[0].name
        .toLowerCase()
        .includes(this.state.searchString.toLowerCase())
    );
    this.setState({
      currentResults: searchedResults
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
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
                return <Results currentResults={this.state.currentResults} />;
              }}
            />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
