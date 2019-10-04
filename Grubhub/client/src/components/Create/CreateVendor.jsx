import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userActions } from "../../js/actions/index";
import { connect } from "react-redux";

class CreateVendor extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      account_type: "Vendor"
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleCreate = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.registerUser(payload);
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body bg-light">
                  <h5 className="card-title text-center">
                    <b>Create your vendor account</b>
                  </h5>
                  <form onSubmit={e => this.handleCreate(e)}>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="first_name"
                          maxLength="30"
                          required
                          autoFocus
                          pattern="[A-Za-z]{1,30}"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="last_name"
                          maxLength="30"
                          required
                          pattern="[A-Za-z]{1,30}"
                          onChange={this.handleChange}
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
                          //pattern="[A-Za-z]{,80}"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          //minLength="8"
                          maxLength="80"
                          required
                          //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      <b>Create your account</b>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  registerUser: payload => dispatch(userActions.registerUser(payload, ownProps))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateVendor);
