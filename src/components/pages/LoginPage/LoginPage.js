import React, { Component } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import './LoginPage.css';
import { withBookService } from '../../hoc/';
import { compose } from '../../utils/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, resetMessage } from '../../../actions';
import extractFormData from '../../../helpers/form-data-extract';
import { Redirect } from 'react-router';

class LoginPage extends Component {

  componentDidMount(){
    this.props.resetMessage();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = extractFormData(e.target);
    this.props.login(formData);
  };

  render() {
    const { isLoggedIn,message } = this.props;

    if (isLoggedIn) {
      return <Redirect to ="/"/>;
    }

    return (
      <Row className="d-flex justify-content-center ">
      <Col xs={12} >
        <Col sm={10} md={6} lg={5} className="login-form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" required />
            </Form.Group>
            <Button className="login-form__button" variant="outline-dark" type="submit">
              Login
            </Button>
          </Form>
        </Col>
        </Col>
        {message?
        <Col sm={10} md={6} lg={5} className="login-status">  
          <Alert variant="primary">
            {message}
          </Alert> 
        </Col>            
        :null}
      </Row>
    );
  }
}
const mapStateToProps = ({ userStatus }) => {
  return {
    isLoggedIn: userStatus.isLoggedIn,
    message: userStatus.message
  }
};

const mapDispatchToProps = (dispatch, { bookService }) => {
  return bindActionCreators({
    login: login(bookService),
    resetMessage: resetMessage
  }, dispatch);
};

export default compose(
  withBookService(),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage);