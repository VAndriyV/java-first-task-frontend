import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export default class Error extends Component {

    render() {
        const { errorMsg } = this.props;
        return (
            <Alert dismissible variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {errorMsg}
                </p>
            </Alert>
        );
    }
}