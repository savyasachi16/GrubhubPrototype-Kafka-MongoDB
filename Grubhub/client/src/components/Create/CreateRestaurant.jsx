import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

class CreateRestaurant extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body bg-light">
                  <h5 className="card-title text-center">
                    <b>You are almost there! </b>
                  </h5>
                  <br />
                  <p className="text-left">
                    Enter your restaurant details below and you will be on your
                    way to growing your business.
                  </p>
                  <br />
                  <h6 className="card-title text-left">
                    <b>Restaurant Information</b>
                  </h6>
                  <form>
                    <div className="form-row ">
                      <label htmlFor="restaurantName">Restaurant Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="restaurantName"
                        id="restaurantName"
                        maxLength="50"
                        required
                        autoFocus
                        pattern="[A-Za-z]{1,30}"
                      />
                    </div>
                    <br></br>
                    <div className="form-row">
                      <div className="form-group col-md-9">
                        <label htmlFor="restaurantAddress">
                          Restaurant Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="restaurantAddress"
                          id="restaurantAddress"
                          maxLength="100"
                          required
                          pattern="[A-Za-z]{1,30}"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="restaurantSuite">Suite</label>
                        <input
                          type="text"
                          className="form-control"
                          name="restaurantSuite"
                          id="restaurantSuite"
                          maxLength="10"
                          placeholder="optional"
                          pattern="[A-Za-z]{1,30}"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="restaurantPhone">
                          Restaurant phone number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="restaurantPhone"
                          id="restaurantPhone"
                          maxlength="10"
                          pattern="[0-9]{10}"
                          required
                        />
                      </div>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary btn-block">
                      <b>Save and Continue</b>
                    </button>
                  </form>
                  <br></br>
                  <p className="text-center">
                    Have an account? <Link to="/login-vendor">Sign in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRestaurant;
