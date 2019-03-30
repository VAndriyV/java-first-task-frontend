import React, { Component } from 'react';
import CartList from '../../CartList/CartList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withBookService } from '../../hoc/';
import { compose } from '../../utils/';
import { Col,Button } from 'react-bootstrap';
import { fetchCart } from '../../../actions';

class CartPage extends Component {

  makeOrder = ()=>{
    const {fetchCart,cartItems}=this.props;
    fetchCart();
    console.log(this.mapToRequestArray(cartItems));

  };
  
  mapToRequestArray=(cartItems)=>{
    return cartItems.map(item=>({id:item.id,quantity:item.quantity}));
  };

  render() {
    const {isLoggedIn}= this.props;

    return (
    <React.Fragment>
      <CartList />
      <Col className="d-flex justify-content-center">
      {isLoggedIn?
      <Button className="login-form__button" variant="outline-dark" type="submit" onClick={this.makeOrder}>
              Order books
      </Button>
      :
      <p className="font-weight-">Please, login to make order!</p>
      }
      </Col>
    </React.Fragment>
    );
  }
}

const mapStateToProps = ({ userStatus, cart }) => {
  return {
    isLoggedIn: userStatus.isLoggedIn,
    cartItems: cart.cartItems
  }
};

const mapDispatchToProps = (dispatch, { bookService }) => {
  return bindActionCreators({
    fetchCart: fetchCart
  }, dispatch);
};

export default compose(
  withBookService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CartPage);

