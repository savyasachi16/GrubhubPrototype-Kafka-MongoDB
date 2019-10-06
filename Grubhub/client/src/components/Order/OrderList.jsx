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
          dataField: "id",
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
          dataField: "id",
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
        id: this.props.restaurant.id
      });
    } else if (this.props.user.account_type === "User") {
      this.props.getBuyerOrders({
        id: this.props.match.params.id
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.restaurant.id && nextProps.user.account_type === "Vendor") {
      nextProps.getRestaurant({
        user_id: this.props.match.params.id
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
          id: nextProps.restaurant.id
        });
      } else {
        nextProps.getBuyerOrders({
          id: nextProps.match.params.id
        });
      }
      this.setState({
        current_orders: nextProps.order.current_orders,
        past_orders: nextProps.order.past_orders
      });
    }
  }
  orderIdFormatter = (cell, row) => {
    let detailpage_link = `/order/detail/${row.id}`;
    return <Link to={detailpage_link}>{cell}</Link>;
  };

  afterSaveCell = (oldValue, newValue, row) => {
    const payload = {
      id: row.id,
      status: row.status
    };
    this.props.changeStatus(payload);
  };

  render() {
    console.log("Past Orders: ", this.state.past_orders);
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
                keyField="id"
                data={this.state.current_orders}
                columns={this.state.current_order_columns}
                bordered={true}
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
                keyField="id"
                data={this.state.current_orders}
                columns={this.state.current_order_columns}
                bordered={true}
              />
            </div>
          )}

          <div>
            <h3>Past Orders</h3>
          </div>
          <div>
            <BootstrapTable
              keyField="id"
              data={this.state.past_orders}
              columns={this.state.past_orders_columns}
              bordered={true}
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
