import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import "./style.css";
import NavLink from "react-bootstrap/NavLink";

const sidebarRoutes = {
  vendor: [
    {
      url: "/account",
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
  ],
  user: [
    {
      url: "/search",
      name: "Search"
    },
    {
      url: "/account",
      name: "Account Details"
    },
    {
      url: "/order",
      name: "Orders"
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
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/login-user" ||
      window.location.pathname === "/login-vendor" ||
      window.location.pathname === "/create-user" ||
      window.location.pathname === "/create-vendor"
    ) {
      this.setState({
        visible: false
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname === "/" ||
      nextProps.location.pathname === "/login-user" ||
      nextProps.location.pathname === "/login-vendor" ||
      nextProps.location.pathname === "/create-user" ||
      nextProps.location.pathname === "/create-vendor"
    ) {
      this.setState({
        visible: false
      });
    } else {
      this.setState({
        visible: true,
        userId: nextProps.user.id
      });
    }
  }

  render() {
    const { visible, currentSelection, userId } = this.state;
    return (
      <div>
        {visible ? (
          <div>
            <nav className="sidebar">
              <ListGroup variant="flush">
                <ListGroup.Item variant="danger"></ListGroup.Item>
                {this.props.user.account_type === "Vendor"
                  ? sidebarRoutes.vendor.map((route, index) => {
                      return (
                        <NavLink
                          key={`/${userId}${route.url}`}
                          to={`/${userId}${route.url}`}
                        >
                          <ListGroup.Item
                            action
                            variant="danger"
                            active={currentSelection === index}
                            onClick={() => {
                              this.setState({ currentSelection: index });
                            }}
                          >
                            {route.name}
                          </ListGroup.Item>
                        </NavLink>
                      );
                    })
                  : sidebarRoutes.user.map((route, index) => {
                      return (
                        <NavLink
                          key={`/${userId}${route.url}`}
                          to={`/${userId}${route.url}`}
                        >
                          <ListGroup.Item
                            action
                            variant="danger"
                            active={currentSelection === index}
                            onClick={() => {
                              this.setState({ currentSelection: index });
                            }}
                          >
                            {route.name}
                          </ListGroup.Item>
                        </NavLink>
                      );
                    })}
              </ListGroup>
            </nav>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Sidebar);
