import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    }catch(error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="android-chrome-512x512.png" width="28" height="28" alt="ium logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/products" className="navbar-item">
              Products
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated &&(
                  <div>
                    <a href="/register" className="ium-button">
                    <strong>Register</strong>
                  </a>
                  <a href="/login" className="ium-button-light">
                    Log in
                  </a>
              </div>
                )}
                {this.props.auth.isAuthenticated &&(
                  <a href="/" onClick={this.handleLogOut} className="ium-button-light">
                  Log Out
                  </a> 
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
