import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../js/actions/index";
import Sidebar from "../Sidebar/Sidebar";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      account_type: "",
      image: "",
      restaurant_id: "",
      restaurant_name: "",
      restaurant_address: "",
      restaurant_zipcode: "",
      restaurant_image: "",
      cuisine: "",
      valid: ""
    };
  }
  render() {
    const displayValid = this.state.valid ? (
      <div>
        <br />
        <span>Profile updated successfully</span>
      </div>
    ) : null;
    return (
      <div>
        <div className="form-row">
          <div className="container shadow p-4 col-sm-9 col-md-7 col-lg-5 mx-auto">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    value={this.state.first_name}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    value={this.state.last_name}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  defaultValue={this.state.email}
                  readOnly
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={this.state.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  className="form-control"
                  id="address"
                  placeholder="Address"
                  value={this.state.address}
                  onInput={this.handleChange}
                />
              </div>
              {this.state.account_type === "Vendor" ? (
                <div>
                  <div className="form-group">
                    <label htmlFor="restaurant_name">Restaurant Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="restaurant_name"
                      placeholder="Name of your restaurant"
                      value={this.state.restaurant_name}
                      onInput={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cuisine">Cusine</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cuisine"
                      placeholder="Cusine"
                      value={this.state.cuisine}
                      onInput={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cuisine">Restaurant Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="restaurant_address"
                      placeholder="Restaurant Address"
                      value={this.state.restaurant_address}
                      onInput={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cuisine">Restaurant Zipcode</label>
                    <input
                      type="text"
                      className="form-control"
                      id="restaurant_zipcode"
                      placeholder="Restaurant Zipcode"
                      value={this.state.restaurant_zipcode}
                      onInput={this.handleChange}
                    />
                  </div>
                </div>
              ) : null}
              <div className="row">
                <div className="col text-center">
                  <button type="submit" className="btn btn-danger m-3">
                    Update
                  </button>
                </div>
              </div>
              {displayValid}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
