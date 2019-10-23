import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions, vendorActions } from "../../js/actions/index";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Image } from "react-bootstrap";
import Navigbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./style.css";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      account_type: "",
      image: "",
      restaurant_id: "",
      restaurant_name: "",
      restaurant_address: "",
      restaurant_zipcode: "",
      restaurant_image: "",
      cuisine: "",
      update_success: "",
      profile_image_file: "Choose a file",
      restaurant_image_file: "Choose a file"
    };
  }
  componentDidMount() {
    const {
      _id,
      first_name,
      last_name,
      email,
      phone,
      account_type,
      address,
      image,
      restaurant_id
    } = this.props.user;
    if (account_type === "Vendor") {
      this.props.getRestaurant({ restaurant_id: restaurant_id });
    }
    const restaurant = this.props.restaurant;
    this.setState({
      _id,
      first_name,
      last_name,
      email,
      phone,
      account_type,
      address,
      image,
      restaurant_id,
      restaurant_name: restaurant.name,
      restaurant_address: restaurant.address,
      restaurant_zipcode: restaurant.zipcode,
      restaurant_image: restaurant.image,
      cuisine: restaurant.cuisine
    });
  }
  componentWillReceiveProps(nextProps) {
    const {_id, first_name, last_name, email, phone, account_type, address, image, restaurant_id} = nextProps.user;
    const restaurant = nextProps.restaurant;
    this.setState({
      _id,
      first_name,
      last_name,
      email,
      phone,
      account_type,
      address,
      image,
      restaurant_id,
      restaurant_name: restaurant.name,
      restaurant_address: restaurant.address,
      restaurant_zipcode: restaurant.zipcode,
      restaurant_image: restaurant.image,
      cuisine: restaurant.cuisine,
      update_success: nextProps.update_success
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleUpdate = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.updateUser(payload);
  };

  handleUpload = e => {
    e.preventDefault();
    const path = new FormData();
    if (e.target.value === "profile_pic") {
      if (this.uploadProfile.files && this.uploadProfile.files.length) {
        path.append("file", this.uploadProfile.files[0] || "");
        this.props.uploadProfileImage(path);
      } else {
        toast.warning("No image selected for upload!");
      }
    } else if (e.target.value === "restaurant_pic") {
      if (this.uploadRestaurant.files && this.uploadRestaurant.files.length) {
        path.append("file", this.uploadRestaurant.files[0] || "");
        this.props.uploadRestaurantImage(path);
      } else {
        toast.warning("No image selected for upload!");
      }
    }
  };

  render() {
    return (
      <div>
        {this.state.account_type === "Vendor" ? <Sidebar /> : <Navigbar />}
        <div className="form-row">
          <div className="container shadow p-4 col-sm-9 col-md-7 col-lg-5 mx-auto">
            <form onSubmit={e => this.handleUpdate(e)}>
              <div className="form-group" style={{ width: "30 rem" }}>
                <Container>
                  <Row>
                    <Col xs={3} md={2}>
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
                <div className="form-group col-md-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    value={this.state.first_name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    value={this.state.last_name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    defaultValue={this.state.email}
                    readOnly
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={this.state.phone}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="address">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group image-upload">
                <label htmlFor="image"> Profile Image</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="file"
                    accept="image/*"
                    ref={ref => {
                      this.uploadProfile = ref;
                    }}
                    aria-describedby="fileUpload"
                    onChange={e => {
                      if (e.target.value) {
                        let fileName = e.target.value.split("\\");
                        this.setState({
                          profile_pic_file:
                            fileName && fileName.length
                              ? fileName[fileName.length - 1]
                              : "Choose file"
                        });
                      }
                    }}
                  />
                  <label
                    className="custom-file-label"
                    id="image-label"
                    htmlFor="file"
                  >
                    {this.state.profile_pic_file}
                  </label>
                </div>
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary m-2"
                    type="button"
                    id="fileUpload"
                    value="profile_pic"
                    onClick={this.handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
              {this.state.account_type === "Vendor" ? (
                <div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="restaurant_name">Restaurant Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="restaurant_name"
                        value={this.state.restaurant_name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="cuisine">Cuisine</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cuisine"
                        value={this.state.cuisine}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="restaurant_address">
                        Restaurant Address
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="restaurant_address"
                        value={this.state.restaurant_address}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="restaurant_zipcode">
                        Restaurant Zipcode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="restaurant_zipcode"
                        value={this.state.restaurant_zipcode}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ width: "30rem" }}>
                    <Container>
                      <Row>
                        <Col xs={6} md={4}>
                          <Image
                            src={this.state.restaurant_image}
                            rounded
                            width="250px"
                            height="250px"
                          />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <div className="form-group image-upload">
                    <label htmlFor="image">Restaurant Image</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="file"
                        accept="image/*"
                        ref={ref => {
                          this.uploadRestaurant = ref;
                        }}
                        aria-describedby="fileUpload"
                        onChange={e => {
                          if (e.target.value) {
                            let fileName = e.target.value.split("\\");
                            this.setState({
                              restaurant_pic_file:
                                fileName && fileName.length
                                  ? fileName[fileName.length - 1]
                                  : "Choose file"
                            });
                          }
                        }}
                      />
                      <label
                        className="custom-file-label"
                        id="image-label"
                        htmlFor="file"
                      >
                        {this.state.restaurant_pic_file}
                      </label>
                    </div>
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary m-2"
                        type="button"
                        id="fileUpload"
                        value="restaurant_pic"
                        onClick={this.handleUpload}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="row">
                <div className="col text-center">
                  <button type="submit" className="btn btn-danger m-3">
                    Update
                  </button>
                </div>
              </div>
            </form>
            <ToastContainer autoClose={2000} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    restaurant: state.restaurant,
    update_success: state.user.update_success
  };
};

const mapDispatchToProps = dispatch => ({
  updateUser: payload => dispatch(userActions.updateUser(payload)),
  getRestaurant: payload => dispatch(vendorActions.getRestaurant(payload)),
  uploadProfileImage: payload =>
    dispatch(userActions.uploadProfileImage(payload)),
  uploadRestaurantImage: payload =>
    dispatch(vendorActions.uploadRestaurantImage(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
