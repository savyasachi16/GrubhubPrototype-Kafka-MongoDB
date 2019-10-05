import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import Nabvigbar from "../Navbar/Navbar";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    var cuisines =
      this.props.search_results && this.props.search_results.length
        ? _.chain(this.props.search_results)
            .map("cuisine")
            .uniq()
            .map(each => ({
              value: each,
              label: each
            }))
            .value()
        : [];
    this.state = {
      search_results: [],
      restaurant_list_columns: [
        {
          fieldName: "id",
          text: "ID",
          hidden: true
        },
        {
          fieldName: "name",
          text: "Name",
          formatter: this.restaurantNameFormatter
        },
        {
          fieldName: "address",
          text: "address"
        },
        {
          fieldName: "cuisine",
          text: "Cuisine",
          formatter: cell =>
            cuisines.filter(opt => opt.label === cell)[0].label || "",
          filter: selectFilter({
            options: cuisines
          })
        }
      ]
    };
  }

  componentDidMount() {
    const search_results = this.props.search_results;
    if (search_results && search_results.length) {
      this.setState({
        search_results
      });
    }
  }
  restaurantNameFormatter = (cell, row) => {
    let detailpage_link = `/restaurant/detail/${row.id}`;
    return <Link to={detailpage_link}>{cell}</Link>;
  };

  render() {
    return (
      <div>
        <Nabvigbar></Nabvigbar>
        {this.state.search_results && this.state.search_results.length ? (
          <div className="container">
            <BootstrapTable
              keyField="id"
              data={this.state.search_results}
              columns={this.state.restaurant_list_coloumns}
              filter={filterFactory()}
              bordered={true}
            />
          </div>
        ) : (
          <div>
            <p>
              Could find any restaurant serving this. Try finding another dish?
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search_results: state.buyer.search_results
});

export default connect(mapStateToProps)(SearchResults);
