import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { vendorActions } from "../../js/actions/index";
import _ from "lodash";
import { Container, Row, Card } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";

class vendorMenu extends Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      sections: []
    };
  }
  componentDidMount() {
    if (this.props.restaurant && this.props.restaurant._id) {
      this.props.getMenu({ restaurant_id: this.props.restaurant._id });
    }
  }
  componentWillReceiveProps(nextProps) {
    let sections = [];
    if (nextProps.restaurant.menu && nextProps.restaurant.menu.length) {
      sections = nextProps.restaurant.menu.map(eachSection => ({
        name: eachSection.section,
        _id: eachSection._id,
        dishes: _.map(eachSection.dishes, "_id"),
        updated_name: ""
      }));
    }
    this.setState({
      menu: nextProps.restaurant.menu,
      sections
    });
  }

  handleChange = e => {
    e.preventDefault();
    let key = e.currentTarget.id;
    let value = e.currentTarget.value;
    let updatedSection = [...this.state.sections];
    _.find(updatedSection, { _id: key }).updated_name = value;
    this.setState({
      sections: updatedSection
    });
  };

  handleEdit = e => {
    e.preventDefault();
    const current_section = _.find(this.state.sections, {
      _id: e.currentTarget.value
    });
    current_section.restaurant_id = this.props.restaurant._id;
    if (e.currentTarget.name === "edit") {
      if (current_section.updated_name) {
        current_section.restaurant_id = this.props.restaurant._id;
        this.props.editSection(current_section);
      }
    } else if (e.currentTarget.name === "delete") {
      this.props.deleteSection(current_section);
    } else {
      console.log("No dishes in section...");
    }
  };

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <Container className="vendorMenu">
          <Row className="p-2 col-sm-9 col-md-7 col-lg-2 mx-auto hover-right">
            <Link to="/dish">
              <button type="submit" className="btn btn-danger m-3">
                Add Dish
              </button>
            </Link>
          </Row>
          <div className="container shadow p-4 col-sm-9 mx-auto">
            {this.state.menu && this.state.menu.length
              ? this.state.menu.map(eachSection => {
                  return (
                    <Container key={eachSection.section}>
                      <Row>
                        <div>
                          <label className="col-sm-2 col-form-label col-form-label-lg">
                            {eachSection.section}
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              onChange={this.handleChange}
                              key={eachSection._id}
                              id={eachSection._id}
                              placeholder="Update Title"
                              aria-describedby="button-addon4"
                            />
                            <div
                              className="input-group-append"
                              id="button-addon4"
                            >
                              <button
                                className="btn btn-outline-danger"
                                type="button"
                                name="edit"
                                value={eachSection._id}
                                onClick={this.handleEdit}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                type="button"
                                name="delete"
                                value={eachSection._id}
                                onClick={this.handleEdit}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </Row>
                      <Row>
                        <Container>
                          <Row>
                            {eachSection.dishes.map(dish => {
                              let dish_detail_link = `/dish/detail/${dish._id}`;
                              return (
                                <Link key={dish._id} to={dish_detail_link}>
                                  <div className="m-2">
                                    <Card style={{ width: "12rem" }}>
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
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </div>
                                </Link>
                              );
                            })}
                          </Row>
                        </Container>
                      </Row>
                    </Container>
                  );
                })
              : null}
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = dispatch => ({
  getMenu: payload => dispatch(vendorActions.getMenu(payload)),
  editSection: payload => dispatch(vendorActions.editSection(payload)),
  deleteSection: payload => dispatch(vendorActions.deleteSection(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(vendorMenu);
