import React, { Component } from "react";
import CartList from "../../CartList/CartList";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withBookService } from "../../hoc/";
import { compose } from "../../utils/";
import { Col, Button, Alert } from "react-bootstrap";
import { fetchCart, updateAvailability } from "../../../actions";
import "./CartPage.css";
import Error from '../../Error/Error';

class CartPage extends Component {
  state = {
    hasError: false,
    errorMsg: "",
    isComplete: false
  };

  makeOrder = () => {
    const { fetchCart, cartItems, bookService } = this.props;

    fetchCart();

    const data = this.mapToRequestArray(cartItems);

    bookService
      .makeOrder(data)
      .then(r => {
        this.setState({
          hasError: false,
          errorMsg: "",
          isComplete: true
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          hasError: true,
          errorMsg: e,
          isComplete: false
        });
      });
  };

  mapToRequestArray = cartItems => {
    return cartItems
      .map(item => ({ bookId: item.id, count: item.count }))
      .filter(item => item.count > 0);
  };

  render() {
    const { isLoggedIn, updateAvailability, cartItems } = this.props;
    const { hasError, errorMsg, isComplete } = this.state;

    if (
      cartItems === null ||
      cartItems === undefined ||
      cartItems.length === 0
    ) {
      return <h4 className="empty-cart-title">The cart is empty!</h4>;
    }    

    return (
      <React.Fragment>
        <div className="update-button-placeholder">
          <Button onClick={updateAvailability} variant="outline-dark">
            Update availablility count
          </Button>
        </div>
        <CartList />
        <Col className="d-flex justify-content-center">
          {isLoggedIn ? (
            <Button
              variant="outline-dark"
              type="submit"
              onClick={this.makeOrder}
            >
              Order books
            </Button>
          ) : (
            <p className="font-weight-">Please, login to make order!</p>
          )}
        </Col>
        <Col sm={10} md={6} lg={5} className="message-placeholder">
          {hasError ?<Error errorMsg={errorMsg}/> : isComplete ? (
            <Alert variant="success">Success! Your order is complete.</Alert>
          ) : null}
        </Col>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ userStatus, cart }) => {
  return {
    isLoggedIn: userStatus.isLoggedIn,
    cartItems: cart.cartItems
  };
};

const mapDispatchToProps = (dispatch, { bookService }) => {
  return bindActionCreators(
    {
      fetchCart: fetchCart,
      updateAvailability: updateAvailability(bookService)
    },
    dispatch
  );
};

export default compose(
  withBookService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CartPage);
