import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginUser from "./Login/LoginUser";
import LoginVendor from "./Login/LoginVendor";
import LandingPage from "./LandingPage/LandingPage";
import CreateUser from "./Create/CreateUser";
import CreateVendor from "./Create/CreateVendor";
import CreateRestaurant from "./Create/CreateRestaurant";
import UserDash from "./Dash/UserDash";
import VendorDash from "./Dash/VendorDash";
import Profile from "./Profile/Profile";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";

class Main extends Component {
  render() {
    return (
      //This is where all my routing happens. Main gets called in App.jsx
      <div>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login-user" component={LoginUser} />
        <Route path="/login-vendor" component={LoginVendor} />
        <Route path="/create-user" component={CreateUser} />
        <Route path="/create-vendor" component={CreateVendor} />
        <Route path="/create-restaurant" component={CreateRestaurant} />
        <Route path="/profile" component={Profile} />
      </div>
    );
  }
}

export default Main;
