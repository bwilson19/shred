import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginClass: 'loginHide'
    };
  }

  loginToggle = () => {
    if (this.state.loginClass === 'loginHide') {
      this.setState({
        loginClass: 'loginShow'
      });
    } else {
      this.setState({
        loginClass: 'loginHide'
      });
    }
  };

  render() {
    return (
      <>
        <header>
          <Link to="/">
            <h1>Shred</h1>
          </Link>
          <nav>
            <ul>
              <Link to="/">
                <li>Search</li>
              </Link>
              <li onClick={this.loginToggle}>Login</li>
            </ul>
          </nav>
        </header>
        <div id="loginWindow" className={this.state.loginClass}>
          {!this.props.storedUserName && (
            <>
              <div>
                <form onSubmit={this.props.storeName}>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    onChange={this.props.changeUserName}
                    value={this.props.newUserName}
                  />
                </form>
              </div>
              <div>
                <button onClick={this.props.storeName}>Login</button>
              </div>
            </>
          )}
          {this.props.storedUserName && (
            <>
              <div>
                <p>You are logged in as {this.props.storedUserName}</p>
              </div>
              <div>
                <button onClick={this.props.resetStoredName}>Log Out</button>
                <button onClick={this.loginToggle}>Close Window</button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Header;
