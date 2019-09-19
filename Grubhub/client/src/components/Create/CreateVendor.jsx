import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Navbar from "../Navbar"

class CreateVendor extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">
                    <b>Create your user account</b>
                  </h5>
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          maxLength="30"
                          required
                          autoFocus
                          pattern="[A-Za-z]{1,30}"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="lastName"
                          maxLength="30"
                          required
                          pattern="[A-Za-z]{1,30}"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          maxLength="80"
                          required
                          pattern="[A-Za-z]{,80}"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="password">
                          Password (8 character minimum)
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          minLength="8"
                          maxLength="80"
                          required
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        />
                      </div>
                    </div>
                    <div className="form-row"></div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="checkRemember"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="checkRemember"
                        >
                          Keep me signed in
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      <b>Proceed to restaurant information</b>
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

export default CreateVendor;
