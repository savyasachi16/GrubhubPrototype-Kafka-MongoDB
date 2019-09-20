import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";

class Login extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body bg-light">
                  <h5 className="card-title text-center">
                    <b>Sign in with your Grubhub user account</b>
                  </h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <label htmlFor="inputEmail">Email</label>
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        required
                        autoFocus
                      />
                    </div>

                    <div className="form-label-group">
                      <label htmlFor="inputPassword">Password</label>
                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkRemember"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="checkRemember"
                      >
                        Keep me signed in
                      </label>
                    </div>
                    <button className="btn btn-danger btn-block" type="submit">
                      <b>Sign in</b>
                    </button>
                  </form>
                  <br></br>
                  <Link to="/create-user">
                    <p className="text-center">Create User Account</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
