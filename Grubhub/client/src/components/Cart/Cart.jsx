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
      total_price: 0,
      cart_columns: [
        {
          fieldName: "name",
          text: "Dish Name"
        },
        {
          fieldName: "quantity",
          text: "Quantity"
        },
        {
          fieldName: "price",
          text: "Price"
        }
      ]
    };
  }

  componentDidMount() {
    const cart = this.props.cart;
    const total_price =
      cart && cart.length
        ? _.chain(cart)
            .map("price")
            .reduce((sum, dish) => sum + dish, 0)
            .value()
        : 0;
    this.setState({
      cart,
      total_price
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart && nextProps.cart.length) {
      const cart = nextProps.cart;
      const total_price =
        cart && cart.length
          ? _.chain(cart)
              .map("price")
              .reduce((sum, dish) => sum + dish, 0)
              .value()
          : 0;
      this.setState({
        cart,
        total_price
      });
    }
  }

  handlePlaceOrder = e => {
    e.preventDefault();
    const { cart, total_price } = this.state;
    const { user_id, restaurant_id } = this.props;
    this.props.placeOrder({
      cart,
      total_price,
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
              />
              <div>
                <h3>Total Price: ${this.state.total_price}</h3>
              </div>
              <div className="place_order">
                <button
                  id="placeOrder"
                  className="btn btn-danger"
                  onClick={this.handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          ) : (
            <div className="empty_cart">
              <Image src={empty} rounded />
              <h3>Cart is empty...</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.customer.cart,
  user_id: state.user.id,
  restaurant_id: state.customer.current_restaurant.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  placeOrder: payload => dispatch(buyerActions.placeOrder(payload, ownProps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
