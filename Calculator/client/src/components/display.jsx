import React, { Component } from "react";

class Display extends Component {
  render() {
    let { disp } = this.props;
    return (
      <div>
        <p className="border border-primary w-75 p-4">{disp}</p>
      </div>
    );
  }
}

export default Display;
