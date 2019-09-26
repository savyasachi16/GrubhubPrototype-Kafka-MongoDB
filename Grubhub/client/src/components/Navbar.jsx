import React, { Component } from "react";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img
              src="http://seekvectorlogo.com/wp-content/uploads/2018/01/grubhub-vector-logo.png"
              width="182.5"
              height="75"
              alt="logo"
            />
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
