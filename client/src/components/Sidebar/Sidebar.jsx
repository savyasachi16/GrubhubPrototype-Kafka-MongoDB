import React, { Component } from "react";
import { Navbar, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import "./style.css";
import { NavLink } from "react-router-dom";
import cookie from "js-cookie";

const sidebarRoutes = {
  vendor: [
    {
      url: "/profile",
      name: "Account Details"
    },
    {
      url: "/order",
      name: "Orders"
    },
    {
      url: "/menu",
      name: "Menu"
    }
  ]
};
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      currentSelection: 0,
      userId: ""
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.setState({
        userId: this.props.user._id
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.state.userId) {
      this.setState({
        userId: nextProps.user._id
      });
    }
  }
  handleLogout = e => {
    e.preventDefault();
    cookie.remove("token");
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    const { userId } = this.state;
    return (
      <div className="fixed">
        <nav className="sidebar flex-column">
          <ListGroup variant="flush">
            <ListGroup.Item variant="danger">
              <Navbar.Brand href={`/${userId}/profile`}>
                <img
                  src="https://assets.grubhub.com/assets/img/grubhub/logo-full-primary.svg"
                  width="125px"
                  height="33px"
                  className="d-inline-block align-top"
                  alt="Main logo link to home"
                />
              </Navbar.Brand>
            </ListGroup.Item>
            {sidebarRoutes.vendor.map((route, selection) => {
              return (
                <NavLink
                  key={`/${userId}${route.url}`}
                  to={`/${userId}${route.url}`}
                >
                  <ListGroup.Item
                    action
                    variant="danger"
                    onClick={() => {
                      this.setState({ currentSelection: selection });
                    }}
                  >
                    {route.name}
                  </ListGroup.Item>
                </NavLink>
              );
            })}
            <ListGroup.Item action variant="danger" onClick={this.handleLogout}>
              Logout
            </ListGroup.Item>
          </ListGroup>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Sidebar);
