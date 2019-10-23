import React, { Component } from "react";
import { connect } from "react-redux";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";
import { buyerActions } from "../../js/actions/index";
import empty from "../../images/emptyCart.svg";
import { Image } from "react-bootstrap";
import "./style.css";
import Navigbar from "../Navbar/Navbar";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      total_amount: 0,
      cart_columns: [
        {
          dataField: "name",
          text: "Dish Name"
        },
        {
          dataField: "quantity",
          text: "Quantity"
        },
        {
          dataField: "price",
          text: "Price"
        }
      ]
    };
  }

  componentDidMount() {
    const cart = this.props.cart;
    const total_amount =
      cart && cart.length
        ? _.chain(cart)
            .map("price")
            .reduce((sum, dish) => sum + dish, 0)
            .value()
        : 0;
    this.setState({
      cart,
      total_amount
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart && nextProps.cart.length) {
      const cart = nextProps.cart;
      const total_amount =
        cart && cart.length
          ? _.chain(cart)
              .map("price")
              .reduce((sum, dish) => sum + dish, 0)
              .value()
          : 0;
      this.setState({
        cart,
        total_amount
      });
    }
  }

  handlePlaceOrder = e => {
    e.preventDefault();
    const { cart, total_amount } = this.state;
    const { user_id, restaurant_id } = this.props;
    this.props.placeOrder({
      cart,
      total_amount,
      user_id,
      restaurant_id
    });
  };
  render() {
    return (
      <div>
        <Navigbar />
        <div className="cart">
          {this.state.cart && this.state.cart.length ? (
            <div>
              <BootstrapTable
                keyField="name"
                data={this.state.cart}
                columns={this.state.cart_columns}
                bordered={true}
                hover
                condensed
                striped
              />
              <div>
                <h6 className="float-right">
                  Total Amount Due at checkout: ${this.state.total_amount}
                </h6>
              </div>
              <br></br>
              <br></br>
              <div className="place_order">
                <button
                  id="placeOrder"
                  className="btn btn-danger float-right"
                  onClick={this.handlePlaceOrder}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          ) : (
            <div className="empty_cart">
              <Image src={empty} rounded width="200px" height="200px" />
              <h3>There is nothing in your cart...</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.buyer.cart,
  user_id: state.user._id,
  restaurant_id: state.buyer.current_restaurant._id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  placeOrder: payload => dispatch(buyerActions.placeOrder(payload, ownProps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
