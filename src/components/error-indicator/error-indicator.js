import React, { Component } from "react";
import {Alert, Col} from "react-bootstrap";

export default class ErrorIndicator extends Component {
  render() {
    return (
      <Col xs={12} className="d-flex justify-content-center error-indicator">
        <Alert variant="danger ">
          <Alert.Heading>Oops..</Alert.Heading>
          <p>
            Something has gone terribly wrong! It is not your fault
          </p>
          <hr />
          <p className="mb-0">
            Our team are already fixing it!
          </p>
        </Alert>
      </Col>
    );
  }
}
