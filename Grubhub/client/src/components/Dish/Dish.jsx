import React, { Component } from "react";
import { connect } from "react-redux";

import { dishActions } from "../../js/actions/index";

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      section: "",
      price: "",
      image: "",
      restaurant_id: "",
      update: false
    };
  }
  componentDidMount() {
    if (this.props.match.params.dish_id) {
      this.props.getDish({
        dish_id: this.props.match.params.dish_id
      });
    } else {
      this.setState({
        restaurant_id: this.props.restaurant_id
      });
    }
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    if (nextProps.dish.id) {
      const { id, name, description, section, price, image } = nextProps.dish;
      this.setState({
        id,
        name,
        description,
        section,
        price,
        image,
        restaurant_id: nextProps.restaurant_id,
        update: true
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.updateDish(payload);
  };

  handleAdd = e => {
    e.preventDefault();
    const payload = this.state;
    console.log(payload);
    this.props.addDish(payload);
  };

  handleDelete = e => {
    e.preventDefault();
    const payload = {
      user_id: this.props.user_id,
      dish_id: this.state.id
    };
    this.props.deleteDish(payload);
  };
  render() {
    return (
      <div>
        <div className="container shadow p-4 col-sm-9 col-md-7 col-lg-5 mx-auto">
          <form>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="name">Dish Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="section">Section</label>
                <input
                  type="text"
                  className="form-control"
                  id="section"
                  value={this.state.section}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  placeholder="work in progress..."
                  value={this.state.image}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              {this.state.update ? (
                <div className="col text-center">
                  <button
                    type="submit"
                    className="btn btn-danger m-3"
                    onClick={e => this.handleUpdate(e)}
                  >
                    Update Dish
                  </button>
                </div>
              ) : (
                <div className="col text-center">
                  <button
                    type="submit"
                    className="btn btn-primary m-3"
                    onClick={e => this.handleAdd(e)}
                  >
                    Add Dish
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  restaurant_id: state.restaurant.id,
  dish: state.dish || {},
  user_id: state.user.id
});

const mapDispathToProps = (dispatch, ownProps) => ({
  addDish: payload => dispatch(dishActions.addDish(payload)),
  deleteDish: payload => dispatch(dishActions.deleteDish(payload)),
  updateDish: payload => dispatch(dishActions.updateDish(payload)),
  getDish: payload => dispatch(dishActions.getDish(payload))
});

export default connect(
  mapStatetoProps,
  mapDispathToProps
)(Dish);
