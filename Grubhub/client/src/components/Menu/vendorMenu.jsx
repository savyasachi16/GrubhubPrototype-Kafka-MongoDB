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
    this.props.getMenu({
      restaurant_id: this.props.restaurant.id
    });
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurant.menu && nextProps.restaurant.menu.length) {
      const sections = nextProps.restaurant.menu.map(eachSection => ({
        name: eachSection.section,
        id: eachSection.id,
        dishes: _.map(eachSection.dishes, "id"),
        updated_name: ""
      }));
      this.setState({
        menu: nextProps.restaurant.menu,
        sections
      });
    } else {
      this.props.getMenu({ restaurant_id: this.props.restaurant.id });
    }
  }
  handleChange = e => {
    e.preventDefault();
    var key = parseInt(e.currentTarget.id);
    var value = e.currentTarget.value;
    var updatedSection = [...this.state.sections];
    _.find(updatedSection, { id: key }).updated_name = value;
    this.setState({
      sections: updatedSection
    });
  };

  handleEdit = e => {
    e.preventDefault();
    const current_section = _.find(this.state.sections, {
      id: parseInt(e.currentTarget.value)
    });
    if (current_section.updated_name) {
      current_section.restaurant_id = this.props.restaurant.id;
      if (e.currentTarget.name === "edit") {
        this.props.editSection(current_section);
      } else if (e.currentTarget.name === "delete") {
        this.props.deleteSection(current_section);
      } else {
        console.log("No items in section...");
      }
    }
  };

  render() {
    return (
      <div>
        <Sidebar />
        <Container className="vendorMenu">
          <Row>
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
          </Row>
          <div className="container shadow p-4 col-sm-9 col-md-7 col-lg-5 mx-auto">
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
                              key={eachSection.id}
                              id={eachSection.id}
                              placeholder="Section Title"
                              aria-describedby="button-addon4"
                            />
                            <div
                              className="input-group-append"
                              id="button-addon4"
                            >
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                name="edit"
                                value={eachSection.id}
                                onClick={this.handleEdit}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                name="delete"
                                value={eachSection.id}
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
                            {eachSection.items.map(item => {
                              let item_detail_link = `/item/detail/${item.id}`;
                              return (
                                <Link key={item.id} to={item_detail_link}>
                                  <div className="m-2">
                                    <Card style={{ width: "14rem" }}>
                                      <Card.Img
                                        variant="top"
                                        src={item.image}
                                      />
                                      <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                          <label>{item.description}</label>
                                          <br></br>
                                          <label>${item.rate}</label>
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
