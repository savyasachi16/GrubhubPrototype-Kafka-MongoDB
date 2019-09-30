import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginUser from "./Login/LoginUser";
import LoginVendor from "./Login/LoginVendor";
import LandingPage from "./LandingPage/LandingPage";
import CreateUser from "./Create/CreateUser";
import CreateVendor from "./Create/CreateVendor";
import CreateRestaurant from "./Create/CreateRestaurant";
import Profile from "./Profile/Profile";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Dish from "./Dish/Dish";
import vendorMenu from "./Menu/vendorMenu";
import Search from "./Search/Search"
class Main extends Component {
  render() {
    return (
      //This is where all my routing happens. Main gets called in App.jsx
      <div>
        <Navbar></Navbar>
        <BrowserRouter>
          <Route component={Sidebar}></Route>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login-user" exact component={LoginUser} />
          <Route path="/login-vendor" exact component={LoginVendor} />
          <Route path="/create-user" exact component={CreateUser} />
          <Route path="/create-vendor" exact component={CreateVendor} />
          <Route path="/create-restaurant" exact component={CreateRestaurant} />
          <Route path="/:id/profile" exact component={Profile} />
          <Route path="/dish" exact component={Dish} />
          <Route path="/:id/menu" exact component={vendorMenu} />
          <Route path="/:id/search" exact component={Search} />
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
