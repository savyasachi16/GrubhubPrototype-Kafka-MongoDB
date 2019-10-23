import React, { Component } from "react";
import { connect } from "react-redux";
import { dishActions } from "../../js/actions/index";
import { Container, Row, Col, Image } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import { toast } from "react-toastify";
class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      description: "",
      section: "",
      price: "",
      image: "",
      restaurant_id: "",
      update: false,
      filepath: "Select a file"
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
    if (nextProps.dish._id && this.props.match.params.dish_id) {
      const { _id, name, description, section, price, image } = nextProps.dish;
      this.setState({
        _id,
        name,
        description,
        section,
        price,
        image,
        restaurant_id: nextProps.restaurant_id,
        update: true,
        filepath: "Select a file"
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
    this.props.addDish(payload);
  };

  handleDelete = e => {
    e.preventDefault();
    const payload = {
      user_id: this.props.user_id,
      dish_id: this.state._id,
      restaurant_id: this.props.restaurant_id
    };
    this.props.deleteDish(payload);
  };

  handleUpload = e => {
    e.preventDefault();
    const path = new FormData();
    if (this.uploadInput.files && this.uploadInput.files.length) {
      path.append("file", this.uploadInput.files[0] || "");
      this.props.uploadDishImage(path);
    } else {
      toast.warning("No image selected for upload!");
    }
  };

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="container shadow p-4 col-sm-9 col-md-7 col-lg-5 mx-auto">
          <form>
            <div className="form-group mx-auto align-center">
              <Container style={{ width: "30rem" }}>
                <Row>
                  <Col xs={6} md={4}>
                    <Image
                      src={this.state.image}
                      roundedCircle
                      width="250px"
                      height="250px"
                    />
                  </Col>
                </Row>
              </Container>
            </div>
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
              <label htmlFor="image">Dish Image</label>
              <div className="form-inline col-md-12 image-upload">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    accept="image/*"
                    ref={ref => {
                      this.uploadInput = ref;
                    }}
                    aria-describedby="fileUpload"
                    onChange={e => {
                      if (e.target.value) {
                        let fileName = e.target.value.split("\\");
                        this.setState({
                          file:
                            fileName && fileName.length
                              ? fileName[fileName.length - 1]
                              : "Choose a file"
                        });
                      }
                    }}
                  />
                </div>
                <label
                  className="custom-file-label"
                  id="image-label"
                  htmlFor="file"
                >
                  {this.state.file}
                </label>
              </div>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary m-2"
                  type="button"
                  id="fileUpload"
                  onClick={this.handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>

            {this.state.update ? (
              <div className="form-row">
                <div className="col text-center">
                  <button
                    type="submit"
                    className="btn btn-danger m-3"
                    onClick={e => this.handleUpdate(e)}
                  >
                    Update Dish
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    type="submit"
                    className="btn btn-danger m-3"
                    onClick={e => this.handleDelete(e)}
                  >
                    Delete Dish
                  </button>
                </div>
              </div>
            ) : (
              <div className="form-row">
                <div className="col text-center">
                  <button
                    type="submit"
                    className="btn btn-primary m-3"
                    onClick={e => this.handleAdd(e)}
                  >
                    Add Dish
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  restaurant_id: state.restaurant._id,
  dish: state.dish || {},
  user_id: state.user._id
});

const mapDispathToProps = (dispatch, ownProps) => ({
  addDish: payload => dispatch(dishActions.addDish(payload,ownProps)),
  deleteDish: payload => dispatch(dishActions.deleteDish(payload, ownProps)),
  updateDish: payload => dispatch(dishActions.updateDish(payload, ownProps)),
  getDish: payload => dispatch(dishActions.getDish(payload)),
  uploadDishImage: payload => dispatch(dishActions.uploadDishImage(payload))
});

export default connect(
  mapStatetoProps,
  mapDispathToProps
)(Dish);
