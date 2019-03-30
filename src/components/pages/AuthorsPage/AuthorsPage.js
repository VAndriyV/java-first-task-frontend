import React, { Component } from 'react';
import AuthorsList from '../../AuthorsList/AuthorsList';
import { Row, Col } from 'react-bootstrap';
import './AuthorsPage.css';
export default class AuthorsPage extends Component {

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xs={12} className="all-authors-title">
                        <h4>Authors</h4>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-between '>
                    <AuthorsList />
                </Row>
            </React.Fragment>
        );
    }
}