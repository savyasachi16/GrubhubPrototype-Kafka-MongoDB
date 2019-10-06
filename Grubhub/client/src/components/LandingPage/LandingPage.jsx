import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image, Container, Col } from "react-bootstrap";
import sideImage from "../../images/landingImage.jpg";
import "./style.css";
class LandingPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <Image src={sideImage} width="700" height="700" />
        <Container className="float-right container-landing align-center">
          <Col>
            <Link to="/login-user" className="font-weight-bold text-center">
              <h4>Login as User</h4>
            </Link>
          </Col>
          <br></br>
          <Col>
            <Link to="/login-vendor" className="font-weight-bold text-center">
              <h4>Login as Vendor</h4>
            </Link>
          </Col>
        </Container>
      </div>
    );
  }
}

export default LandingPage;
