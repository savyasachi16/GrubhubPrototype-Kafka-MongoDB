import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import cookie from "js-cookie";

class Navigbar extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }
  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user
    });
  }

  handleLogout = e => {
    e.preventDefault();
    cookie.remove("token");
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    const redirect = `\\${this.state.user._id}\\search`;
    return (
      <Navbar bg="light" expand="lg" className="fluid">
        <Navbar.Brand href={redirect}>
          <img
            src="https://assets.grubhub.com/assets/img/grubhub/logo-full-primary.svg"
            width="125px"
            height="33px"
            className="d-inline-block align-top"
            alt="Main logo link to home"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto fluid">
            <NavDropdown
              title={this.state.user.first_name}
              id="basic-nav-dropdown"
              drop="left"
            >
              <NavDropdown.Item href={`/${this.state.user._id}/profile`}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href={`/${this.state.user._id}/cart`}>
                Cart
              </NavDropdown.Item>
              <NavDropdown.Item href={`/${this.state.user._id}/order`}>
                My Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Navigbar);
