import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { userActions } from "../../js/actions/index";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";

class UserDash extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
      </div>
    );
  }
}

export default UserDash;
