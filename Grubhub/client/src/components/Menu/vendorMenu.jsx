import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { vendorActions } from "../../js/actions/index";

class vendorMenu extends Component {
  constructor() {
    super();
    this.state = {
      menu: []
    };
  }
  componentDidMount() {
    this.props.getMenu({
      restaurant_id: this.props.restaurant_id
    });
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurant.menu && nextProps.restaurant.menu.length) {
      this.setState({
        menu: nextProps.restaurant.menu
      });
    }
  }
  render() {
    return (
      <div>
        <Link to="/dish">
          <div className="container col-sm-2 mx-auto">
            <div className="row">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary m-3">
                  Add Dish
                </button>
              </div>
            </div>
          </div>
        </Link>
        <div className="container shadow p-4 col-sm-9 col-md-7 col-lg-5 mx-auto">
          {this.state.menu && this.state.menu.length
            ? this.state.menu.map(eachSection => {
                return (
                  <div>
                    <label className="col-sm-2 col-form-label col-form-label-lg">
                      {eachSection.section}
                    </label>
                    <div class="card-deck">
                      {eachSection.items.map(dish => {
                        let dish_detail_link = `/dish/detail/${dish.id}`;
                        return (
                          <Link to={dish_detail_link}>
                            <div class="card menu_dish">
                              <img
                                //src={}
                                class="card-img-top img-fluid img-thumbnail"
                                alt="..."
                              ></img>
                              <div class="card-body">
                                <h5 class="card-title">{dish.name}</h5>
                                <p class="card-text">{dish.description}</p>
                                <p class="card-text">{dish.price}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = dispatch => ({
  getMenu: payload => dispatch(vendorActions.getMenu(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(vendorMenu);
