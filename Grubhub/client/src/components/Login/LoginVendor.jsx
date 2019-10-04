import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userActions } from "../../js/actions/index";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

class LoginVendor extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleVendorLogin = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.loginUser(payload);
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
                    <b>Sign in with your Grubhub vendor account</b>
                  </h5>
                  <form
                    className="form-signin"
                    onSubmit={e => this.handleVendorLogin(e)}
                  >
                    <div className="form-row"></div>
                    <div className="form-label-group">
                      <label htmlFor="inputEmail">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        required
                        autoFocus
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-label-group">
                      <label htmlFor="inputPassword">Password</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        required
                        onChange={this.handleChange}
                      />
                    </div>
                    <br></br>

                    <div className="form-label-group">
                      <button
                        className="btn btn-danger btn-block"
                        type="submit"
                      >
                        <b>Sign in</b>
                      </button>
                    </div>
                  </form>
                  <ToastContainer autoClose={2000} />

                  <br></br>
                  <Link to="/create-vendor">
                    <p className="text-center">Create Vendor Account</p>
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

const mapStateToProps = state => ({
  user: state.user
});
const mapDispathToProps = (dispatch, ownProps) => ({
  loginUser: payload => dispatch(userActions.loginUser(payload, ownProps))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(LoginVendor);
