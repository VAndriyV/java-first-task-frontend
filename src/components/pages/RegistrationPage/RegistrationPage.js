import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import './RegistrationPage.css';
import { compose } from '../../utils/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { registration } from '../../../actions';
import { withBookService } from '../../hoc/';
import extractFormData from '../../../helpers/form-data-extract';

class RegistrationPage extends Component {

  state = {
    password: '',
    confirmPassword: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      const formData = extractFormData(e.target);
      this.props.registration(formData);
    }
  };



  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState({
      password: password
    });
  };

  onConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    this.setState({
      confirmPassword: confirmPassword
    });
  };

  render() {
    return (
      <Row className="d-flex justify-content-center ">
        <Col sm={10} md={6} lg={5} className="registration-form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" pattern=".{0}|.{6,}" title="Password require 6+ charachters"
                required onChange={this.onPasswordChange} />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Password" required name="confirmPassword" onChange={this.onConfirmPasswordChange} />
            </Form.Group>
            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="text" placeholder="Phone number" name="phoneNumber" required
                pattern="\d{3}[\-]\d{3}[\-]\d{4}" title="Use 123-456-7899 template" />
              <Form.Text className="text-muted">
                We'll never share your phone number with anyone else.
              </Form.Text>
            </Form.Group>
            <Button className="registration-form__button" variant="outline-dark" type="submit">
              Registration
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state
  }
};

const mapDispatchToProps = (dispatch, { bookService }) => {
  return bindActionCreators({
    registration: registration(bookService)
  }, dispatch);
};

export default compose(
  withBookService(),
  connect(mapStateToProps, mapDispatchToProps)
)(RegistrationPage);