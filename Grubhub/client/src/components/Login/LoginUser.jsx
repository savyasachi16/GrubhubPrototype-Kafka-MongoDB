import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../js/actions/index";

class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      valid: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.valid) {
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleUserLogin = e => {
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
                    <b>Sign in with your Grubhub user account</b>
                  </h5>
                  <form
                    className="form-signin"
                    onSubmit={e => this.handleUserLogin(e)}
                  >
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

const mapStateToProps = state => ({
  history: state.history,
  user: state.user
});
const mapDispatchToProps = (dispath, ownProps) => ({
  loginUser: payload => dispath(userActions.loginUser(payload, ownProps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginUser);
