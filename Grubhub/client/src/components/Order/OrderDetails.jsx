import React, { Component } from "react";
import { connect } from "react-redux";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import { vendorActions } from "../../js/actions/index";
import { Link } from "react-router-dom";

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      current_orders: [],
      past_orders: [],
      past_orders_columns: [
        {
          fieldName: "id",
          text: "Order ID",
          formatter: this.orderIdFormatter
        },
        {
          fieldName: "amount",
          text: "Amount"
        },
        {
          fieldName: "status",
          text: "Order Status"
        }
      ],
      current_order_columns: [
        {
          fieldName: "id",
          text: "Order ID",
          formatter: this.orderIdFormatter
        },
        {
          fieldName: "amount",
          text: "Amount"
        },
        {
          fieldName: "status",
          text: "Order Status",
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
    if (this.props.user.type === "Vendor") {
      this.props.getRestaurantOrders({
        id: this.props.restaurant.id
      });
    } else {
      this.props.getBuyerOrders({
        id: this.props.user.id
      });
    }
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.order.current_orders &&
        nextProps.order.current_orders.length) ||
      (nextProps.order.past_orders && nextProps.order.past_orders.length)
    ) {
      this.setState({
        current_orders: nextProps.order.current_orders,
        past_orders: nextProps.order.past_orders
      });
    }
  }

  orderIdFormatter = (cell, row) => {
    var detailpage_link = `/order/detail/${row.id}`;
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
    return (
      <div>
        <div>
          <label className="col-sm-2 col-form-label col-form-label-lg">
            Current Orders
          </label>
        </div>
        {this.props.user.type === "Vendor" ? (
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
          <label className="col-sm-2 col-form-label col-form-label-lg">
            Past Orders
          </label>
        </div>
        <div>
          <BootstrapTable
            keyField="id"
            data={this.state.past_orders}
            columns={this.state.past_orders_coloumns}
            bordered={true}
          />
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
  getBuyerOrders: payload => dispatch(vendorActions.getBuyerOrders(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
