import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginUser from "./Login/LoginUser";
import LoginVendor from "./Login/LoginVendor";
import LandingPage from "./LandingPage/LandingPage";
import CreateUser from "./Create/CreateUser";
import CreateVendor from "./Create/CreateVendor";
import Profile from "./Profile/Profile";
import Dish from "./Dish/Dish";
import vendorMenu from "./Menu/vendorMenu";
import Search from "./Search/Search";
import OrderDetails from "./Order/OrderDetails";
import Cart from "./Cart/Cart";
import SearchResults from "./Search/SearchResults";
import Restaurant from "./Restaurant/Restaurant";
import OrderList from "./Order/OrderList";
class Main extends Component {
  render() {
    return (
      //This is where all my routing happens. Main gets called in App.jsx
      <div>
        <BrowserRouter>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login-user" exact component={LoginUser} />
          <Route path="/login-vendor" exact component={LoginVendor} />
          <Route path="/create-user" exact component={CreateUser} />
          <Route path="/create-vendor" exact component={CreateVendor} />

          <Route path="/:id/profile" exact component={Profile} />
          <Route exact path="/:id/cart" component={Cart} />
          <Route exact path="/:id/order" component={OrderList} />
          <Route path="/:id/menu" exact component={vendorMenu} />
          <Route path="/:id/search" exact component={Search} />
          <Route path="/results" exact component={SearchResults} />

          <Route path="/dish" exact component={Dish} />
          <Route path="/dish/detail/:dish_id" exact component={Dish} />
          <Route
            path="/order/detail/:order_id"
            exact
            component={OrderDetails}
          />
          <Route
            path="/restaurant/detail/:restaurant_id"
            exact
            component={Restaurant}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
