import React, { Component } from "react";
import { connect } from "react-redux";
import { buyerActions } from "../../js/actions/index";
import Navigbar from "../Navbar/Navbar";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSearch = e => {
    e.preventDefault();
    const payload = {
      search: this.state.search
    };
    this.props.getResults(payload);
  };
  render() {
    return (
      <div>
        <Navigbar></Navigbar>
        <div className="container p-4 col-sm-7">
          <form onSubmit={e => this.handleSearch(e)}>
            <div className="row">
              <div className="col text-center">
                <div className="form-group active-cyan-4 mb-4">
                  <input
                    className="form-control mr-sr-m2"
                    type="text"
                    id="search"
                    placeholder="Search for Dishes Here"
                    aria-label="Search"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <button type="submit" className="btn btn-danger">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispathToProps = (dispatch, ownProps) => ({
  getResults: payload => dispatch(buyerActions.getResults(payload, ownProps))
});

export default connect(
  null,
  mapDispathToProps
)(Search);
