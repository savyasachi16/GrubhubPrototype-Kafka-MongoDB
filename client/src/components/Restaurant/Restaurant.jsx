import React, { Component } from "react";
import { connect } from "react-redux";
import { buyerActions } from "../../js/actions/index";
import { Container, Row, Card, Form, Col } from "react-bootstrap";
import _ from "lodash";
import Navigbar from "../Navbar/Navbar";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_restaurant: {
        _id: "",
        name: "",
        cuisine: "",
        address: "",
        zipcode: "",
        image: "",
        menu: ""
      },
      cart: {}
    };
  }
  componentDidMount() {
    this.props.getRestaurantDetails({
      restaurant_id: this.props.match.params.restaurant_id
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current_restaurant) {
      this.setState({
        current_restaurant: nextProps.current_restaurant
      });
    }
  }
  handleQuantity = e => {
    if (e.target.value < 0 || !e.target.value) {
      e.target.value = 0;
    } else if (e.target.value > 10) {
      e.target.value = 10;
    }
    const cart = this.state.cart;
    cart[e.target.id] = e.target.value;
    this.setState({
      cart
    });
  };
  handleAddToCart = e => {
    e.preventDefault();
    const dishes = _.chain(this.state.current_restaurant.menu)
      .map("dishes")
      .concat()
      .flatten()
      .value();
    if (dishes && dishes.length) {
      const cart = dishes.map(dish => {
        if (this.state.cart[dish._id] && this.state.cart[dish._id] !== 0) {
          return {
            _id: dish._id,
            name: dish.name,
            quantity: this.state.cart[dish._id],
            price: dish.price ? dish.price * this.state.cart[dish._id] : 0
          };
          //NEW
        } else if (parseInt(this.state.cart[dish._id]) === 0) {
          return {
            _id: dish._id,
            name: dish.name,
            quantity: this.state.cart[dish._id],
            price: dish.price ? dish.price * this.state.cart[dish._id] : 0
          };
        }
      });
      if (_.compact(cart) && _.compact(cart).length) {
        console.log(
          _.chain(cart)
            .compact()
            .filter(dish => dish.price !== 0)
            .value()
        );
        this.props.addToCart({
          cart: _.chain(cart)
            .compact()
            .filter("price")
            .value()
        });
        toast.success("Added to cart!");
      }
    }
  };
  render() {
    const { current_restaurant } = this.state;
    return (
      <div>
        <Navigbar />
        <div className="form-group row restaurant_title">
          <div className="image-container">
            <img
              src={current_restaurant.image}
              className="img-thumbnail"
              alt="Oops, restaurant has no image..."
            />
          </div>
          <div className="restaurant_name">
            <h1>{current_restaurant.name}</h1>
            <h5>{current_restaurant.address}</h5>
          </div>
        </div>
        <div className="restaurant-detail">
          <div className="container">
            <h3 className="menu">Menu</h3>
            {current_restaurant.menu && current_restaurant.menu.length
              ? current_restaurant.menu.map(eachSection => {
                  return (
                    <div className="section">
                      <h4>{eachSection.section}</h4>
                      <div>
                        <Container>
                          <Row>
                            {eachSection.dishes.map(dish => {
                              return (
                                <div className="m-2">
                                  <Card
                                    style={{ width: "14rem", height: "20rem" }}
                                    key={dish._id}
                                  >
                                    <Card.Img
                                      variant="top"
                                      src={dish.image}
                                      width="60px"
                                      height="90px"
                                    />
                                    <Card.Body>
                                      <Card.Title>{dish.name}</Card.Title>
                                      <Card.Text>
                                        <label>{dish.description}</label>
                                        <br></br>
                                        <label>${dish.price}</label>
                                        <Form.Group as={Row}>
                                          <Form.Label column sm="6">
                                            Quantity
                                          </Form.Label>
                                          <Col sm="6">
                                            <Form.Control
                                              type="number"
                                              placeholder=""
                                              min="0"
                                              max="10"
                                              id={dish._id}
                                              onChange={this.handleQuantity}
                                            />
                                          </Col>
                                        </Form.Group>
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                </div>
                              );
                            })}
                          </Row>
                        </Container>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <button
            type="submit"
            className="btn btn-danger m-3 float-right"
            onClick={this.handleAddToCart}
          >
            Add Selected Dishes to Cart
          </button>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  current_restaurant: state.buyer.current_restaurant
});
const mapDispatchToProps = dispatch => ({
  getRestaurantDetails: payload =>
    dispatch(buyerActions.getRestaurantDetails(payload)),
  addToCart: payload => dispatch(buyerActions.addToCart(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
