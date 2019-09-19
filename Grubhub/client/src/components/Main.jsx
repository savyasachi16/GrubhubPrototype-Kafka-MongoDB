import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginUser from "./Login/LoginUser";
import LoginVendor from "./Login/LoginVendor";
import LandingPage from "./LandingPage/LandingPage";
import CreateUser from "./Create/CreateUser";
import CreateVendor from "./Create/CreateVendor";

class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login-user" component={LoginUser} />
        <Route path="/login-vendor" component={LoginVendor} />
        <Route path="/create-user" component={CreateUser} />
        <Route path="/create-vendor" component={CreateVendor} />
      </div>
    );
  }
}

export default Main;
