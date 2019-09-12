import React, { Component } from "react";

class Buttons extends Component {
  render() {
    const buttonStyle = "btn btn-primary font-weight-bold p-3 m-1";
    return (
      <div className="button">
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="1"
        >
          1
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="2"
        >
          2
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="3"
        >
          3
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="+"
        >
          +
        </button>
        <br />

        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="4"
        >
          4
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="5"
        >
          5
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="6"
        >
          6
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="-"
        >
          -
        </button>
        <br />

        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="7"
        >
          7
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="8"
        >
          8
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="9"
        >
          9
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="*"
        >
          *
        </button>
        <br />

        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="0"
        >
          0
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="C"
        >
          C
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="="
        >
          =
        </button>
        <button
          className={buttonStyle}
          onClick={e => this.props.onClick(e.target.name)}
          name="/"
        >
          /
        </button>
        <br />
      </div>
    );
  }
}

export default Buttons;
