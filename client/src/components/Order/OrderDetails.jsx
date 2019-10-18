import React, { Component } from "react";
import { connect } from "react-redux";
import { vendorActions } from "../../js/actions";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import Sidebar from "../Sidebar/Sidebar";
import Navigationbar from "../Navbar/Navbar";
import "./style.css";
const columns = [
  {
    dataField: "name",
    text: "Name"
  },
  {
    dataField: "quantity",
    text: "Quantity"
  }
];

class Orderdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        id: "",
        name: "",
        address: "",
        status: "",
        amount: "",
        dishes: []
      }
    };
  }
  componentDidMount() {
    const payload = {
      order_id: this.props.match.params.order_id
    };
    this.props.getOrderDetails(payload);
  }
  componentWillReceiveProps(nextProps) {
    const { id, status, amount, dishes } = nextProps.order;
    const { name, address } = nextProps.order.buyer;
    this.setState({
      order: {
        id,
        name,
        address,
        status,
        amount,
        dishes
      }
    });
  }
  render() {
    return (
      <div>
        {this.props.user.account_type === "Vendor" ? (
          <Sidebar />
        ) : (
          <Navigationbar />
        )}
        <div className="container shadow p-4 col-sm-9 col-md-7 col-lg-5 mx-auto">
          <form>
            <div className="form-group row">
              <label
                htmlFor="orderId"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Order ID
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg order_detail_input"
                  id="orderId"
                  value={this.state.order.id}
                  readOnly
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="buyerName"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Buyer Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg order_detail_input"
                  id="buyerName"
                  value={this.state.order.name}
                  readOnly
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="address"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Buyer Address
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control form-control-lg order_detail_input"
                  id="address"
                  value={this.state.order.address}
                  readOnly
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="amount"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Amount
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg order_detail_input"
                  id="amount"
                  value={this.state.order.amount}
                  readOnly
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="status"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Status
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg order_detail_input"
                  id="status"
                  value={this.state.order.status}
                  readOnly
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="dishes"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Dishes
              </label>
            </div>
            <div>
              <BootstrapTable
                keyField="name"
                data={this.state.order.dishes}
                columns={columns}
                bordered={true}
                hover
                condensed
                striped
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order.active,
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  getOrderDetails: payload => dispatch(vendorActions.getOrderDetails(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orderdetails);
