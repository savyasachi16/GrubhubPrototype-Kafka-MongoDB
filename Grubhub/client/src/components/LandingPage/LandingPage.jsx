import React, { Component } from "react";
import {Link} from "react-router-dom";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>Landing Page Placeholder</div>
        <br />
        <Link to="/login-user">
          <p>Link to User Login</p>
        </Link>
        <br/>
        <Link to="/login-vendor">
          <p>Link to Vendor Login</p>
        </Link>
        <div></div>
      </div>
    );
  }
}

export default LandingPage;
