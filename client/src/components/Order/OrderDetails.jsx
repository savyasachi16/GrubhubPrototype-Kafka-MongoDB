import React, { Component } from "react";
import { connect } from "react-redux";
import { vendorActions, messageActions } from "../../js/actions";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import Sidebar from "../Sidebar/Sidebar";
import Navigationbar from "../Navbar/Navbar";
import { Accordion, Card, Button } from "react-bootstrap";
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
        _id: "",
        name: "",
        address: "",
        status: "",
        amount: "",
        dishes: [],
        buyer_messages: [],
        vendor_messages: []
      },
      message_body: ""
    };
  }
  componentDidMount() {
    const payload = {
      order_id: this.props.match.params.order_id
    };
    this.props.getOrderDetails(payload);
  }
  componentWillReceiveProps(nextProps) {
    const {
      _id,
      status,
      amount,
      dishes,
      buyer_messages,
      vendor_messages
    } = nextProps.order;
    const { name, address } = nextProps.order.buyer;
    console.log('here')
    this.setState({
      order: {
        _id,
        name,
        address,
        status,
        amount,
        dishes,
        buyer_messages,
        vendor_messages
      },
      message_body: ""
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handlePushMessage = e => {
    e.preventDefault();
    const payload =  {
        account_type: this.props.user.account_type,
        message_body: this.state.message_body,
        _id: this.state.order._id
      }
    this.props.pushMessage(payload);
  };
  render() {
    return (
      <div>
        {this.props.user.account_type === "Vendor" ? (
          <Sidebar />
        ) : (
          <Navigationbar />
        )}
        <div className="container shadow p-4 col-sm-9 col-md-7 col-lg-7 mx-auto">
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
                  value={this.state.order._id}
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
              <label className="col-sm-2 col-form-label col-form-label-lg">
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
            <div className="form-group row">
              <label className="col-sm-2 col-form-label col-form-label-lg">
                Messages
              </label>
            </div>
            <div className="form-group column">
              Vendor Messages
              <Accordion>
                {this.state.order.vendor_messages &&
                this.state.order.vendor_messages.length
                  ? this.state.order.vendor_messages.map((value, index) => {
                      return (
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey={index}
                            >
                              Message {index + 1}
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey={index}>
                            <Card.Body>{value}</Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      );
                    })
                  : null}
              </Accordion>
            </div>
            <div className="form-group column">
              Buyer Messages
              <Accordion>
                {this.state.order.buyer_messages &&
                this.state.order.buyer_messages.length
                  ? this.state.order.buyer_messages.map((value, index) => {
                      return (
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey={index}
                            >
                              Message {index + 1}
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey={index}>
                            <Card.Body>{value}</Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      );
                    })
                  : null}
              </Accordion>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="address">Send Message</label>
                <textarea
                  className="form-control"
                  id="message_body"
                  value={this.state.message_body}
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary m-3"
                onClick={this.handlePushMessage}
              >
                Send
              </button>
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
  getOrderDetails: payload => dispatch(vendorActions.getOrderDetails(payload)),
  pushMessage: payload => dispatch(messageActions.pushMessage(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orderdetails);
