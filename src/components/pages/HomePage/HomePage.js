import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import "./HomePage.css";

export default class HomePage extends Component {

    render() {
        return (
            <Row>
                <Col xs={12} className="greeting">
                    <h2 className="text-center">Welcome to our library!</h2>
                </Col>
            </Row>
        );
    }
}