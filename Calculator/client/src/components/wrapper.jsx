import React, { Component } from "react";

import Title from "./title";
import Display from "./display";
import Buttons from "./buttons";

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
      this.setState({
        // eslint-disable-next-line
        disp: (eval(this.state.disp) || "") + ""
      });
    } catch (e) {
      this.setState({
        disp: "error"
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
