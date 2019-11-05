import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Nabvigbar from "../Navbar/Navbar";
import PageListRenderer from "../PageListRenderer";

const paginationOption = {
  custom: true
};

class SearchResults extends Component {
  constructor(props) {
    super(props);
    let cuisines =
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
          dataField: "_id",
          text: "ID",
          hidden: true
        },
        {
          dataField: "name",
          text: "Name",
          formatter: this.restaurantNameFormatter
        },
        {
          dataField: "address",
          text: "Location"
        },
        {
          dataField: "cuisine",
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

  restaurantNameFormatter = (cell, row) => {
    let detailpage_link = `/restaurant/detail/${row._id}`;
    return <Link to={detailpage_link}>{cell}</Link>;
  };
  componentDidMount() {
    const search_results = this.props.search_results;
    if (search_results && search_results.length) {
      this.setState({
        search_results
      });
    }
  }

  render() {
    const options = {
      sizePerPage: 1,
      pageListRenderer: props => PageListRenderer({ ...props }),
      custom: true,
      totalSize: this.props.search_results.length
    };

    const pagination = paginationFactory(options);
    return (
      <div>
        <Nabvigbar></Nabvigbar>
        {this.state.search_results && this.state.search_results.length ? (
          <div className="container shadow">

            <PaginationProvider pagination={pagination}>
              {({ paginationProps, paginationTableProps }) => (
                <div>
                  <PaginationTotalStandalone {...paginationProps} />
                  <BootstrapTable
                    keyField="id"
                    data={this.state.search_results}
                    columns={this.state.restaurant_list_columns}
                    filter={filterFactory()}
                    bordered={true}
                    hover
                    condensed
                    striped
                    {...paginationTableProps}
                  />
                  <PaginationListStandalone {...paginationProps} />
                </div>
              )}
          </PaginationProvider> 
          
          </div>
        ) : (
          <div className="container shadow mx-auto">
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
