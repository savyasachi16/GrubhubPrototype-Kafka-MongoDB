import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login_page/Login";

class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        <Route path="/login" component={Login}/>
      </div>
    );
  }
}

export default Main;
