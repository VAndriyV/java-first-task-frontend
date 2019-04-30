import React, { Component } from 'react';
import { Alert,Col } from 'react-bootstrap';
import "./Error.css";
export default class Error extends Component {

    render() {
        const { errorMsg } = this.props;
        return (
            <Col className="error-msg">
            <Alert dismissible variant="danger" >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {errorMsg}
                </p>
            </Alert>
            </Col>
        );
    }
}