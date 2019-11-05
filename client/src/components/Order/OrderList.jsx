import React, { Component } from "react";
import { connect } from "react-redux";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import { vendorActions, userActions } from "../../js/actions/index";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navigationbar from "../Navbar/Navbar";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_orders: [],
      past_orders: [],
      past_orders_columns: [
        {
          dataField: "_id",
          text: "ID",
          formatter: this.orderIdFormatter
        },
        {
          dataField: "amount",
          text: "Amount"
        },
        {
          dataField: "status",
          text: "Status"
        }
      ],
      current_order_columns: [
        {
          dataField: "_id",
          text: "ID",
          formatter: this.orderIdFormatter
        },
        {
          dataField: "amount",
          text: "Amount"
        },
        {
          dataField: "status",
          text: "Status",
          editor: {
            type: Type.SELECT,
            options: [
              {
                label: "New",
                value: "NEW"
              },
              {
                label: "Preparing",
                value: "PREPARING"
              },
              {
                label: "Ready",
                value: "READY"
              },
              {
                label: "Delivered",
                value: "DELIVERED"
              },
              {
                label: "Cancelled",
                value: "CANCELLED"
              }
            ]
          }
        }
      ]
    };
  }

  componentDidMount() {
    if (this.props.user.account_type === "Vendor") {
      this.props.getRestaurantOrders({
        _id: this.props.restaurant._id
      });
    } else if (this.props.user.account_type === "User") {
      this.props.getBuyerOrders({
        _id: this.props.match.params._id
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.restaurant._id && nextProps.user.account_type === "Vendor") {
      nextProps.getRestaurant({
        user_id: this.props.match.params._id
      });
    }
    if (
      (nextProps.order.current_orders &&
        nextProps.order.current_orders.length) ||
      (nextProps.order.past_orders && nextProps.order.past_orders.length)
    ) {
      this.setState({
        current_orders: nextProps.order.current_orders,
        past_orders: nextProps.order.past_orders
      });
    } else {
      if (nextProps.user.type === "Vendor") {
        nextProps.getRestaurantOrders({
          _id: nextProps.restaurant._id
        });
      } else {
        nextProps.getBuyerOrders({
          _id: nextProps.match.params._id
        });
      }
      this.setState({
        current_orders: nextProps.order.current_orders,
        past_orders: nextProps.order.past_orders
      });
    }
  }
  orderIdFormatter = (cell, row) => {
    let detailpage_link = `/order/detail/${row._id}`;
    return <Link to={detailpage_link}>{cell}</Link>;
  };

  afterSaveCell = (oldValue, newValue, row) => {
    const payload = {
      _id: row._id,
      status: row.status
    };
    this.props.changeStatus(payload);
  };

  render() {
    console.log("Restuarant ID: ", this.props.restaurant._id);
    console.log("Order ID: ", this.props.match.params._id);

    return (
      <div>
        {this.props.user.account_type === "Vendor" ? (
          <Sidebar />
        ) : (
          <Navigationbar />
        )}
        <div className="order_list">
          <div>
            <h3>Current Orders</h3>
          </div>
          {this.props.user.account_type === "Vendor" ? (
            <div>
              <BootstrapTable
                keyField="_id"
                data={this.state.current_orders}
                columns={this.state.current_order_columns}
                bordered={true}
                hover
                condensed
                striped
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,
                  afterSaveCell: (oldValue, newValue, row) => {
                    this.afterSaveCell(oldValue, newValue, row);
                  }
                })}
              />
            </div>
          ) : (
            <div>
              <BootstrapTable
                keyField="_id"
                data={this.state.current_orders}
                columns={this.state.current_order_columns}
                bordered={true}
                hover
                condensed
                striped
              />
            </div>
          )}

          <div>
            <h3>Previous Orders</h3>
          </div>
          <div>
            <BootstrapTable
              keyField="_id"
              data={this.state.past_orders}
              columns={this.state.past_orders_columns}
              bordered={true}
              hover
              condensed
              striped
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    restaurant: state.restaurant,
    order: state.order
  };
};

const mapDispatchToProps = dispatch => ({
  getRestaurantOrders: payload =>
    dispatch(vendorActions.getRestaurantOrders(payload)),
  changeStatus: payload => dispatch(vendorActions.changeStatus(payload)),
  getBuyerOrders: payload => dispatch(vendorActions.getBuyerOrders(payload)),
  getUser: payload => dispatch(userActions.getUser(payload)),
  getRestaurant: payload => dispatch(vendorActions.getRestaurant(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
