import React, { Component } from "react";

import Title from "./title";
import Display from "./display";
import Buttons from "./buttons";

import axios from "axios";

class Wrapper extends Component {
  state = {
    disp: ""
  };

  onClick = button => {
    if (button === "=") {
      this.calculate();
    } else if (button === "C") {
      this.reset();
    } else {
      this.setState({
        disp: this.state.disp + button
      });
    }
  };

  calculate = () => {
    try {
      let expr = this.state.disp;
      return axios
        .post("http://localhost:3001/calculate", { expr })
        .then(response => {
          if (response.status === 200) {
            this.setState({
              // eslint-disable-next-line
              disp: response.data
            });
          } else {
            return "ERROR";
          }
        })
        .catch(error => {
          return "ERROR";
        });
    } catch (e) {
      this.setState({
        disp: "Error in React"
      });
    }
  };

  reset = () => {
    this.setState({
      disp: ""
    });
  };

  render() {
    const calcStyle = {
      maxWidth: "22rem",
      marginLeft: "33%",
      marginTop: "5%"
    };
    return (
      <div style={calcStyle}>
        <Title></Title>
        <Display disp={this.state.disp} />
        <Buttons onClick={this.onClick} />
      </div>
    );
  }
}

export default Wrapper;
