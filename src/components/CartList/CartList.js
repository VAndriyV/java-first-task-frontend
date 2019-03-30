import React, { Component } from "react";
import { connect } from "react-redux";
import {
  bookAddedToCart,
  bookRemovedFromCart,
  allBooksRemovedFromCart,
  fetchCart
} from "../../actions/";
import { bindActionCreators } from "redux";
import { FaTrash, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Table, Button } from "react-bootstrap";
import "./CartList.css";

class CartList extends Component {
  renderRow = (item, idx) => {
    const { id, title, quantity } = item;
    const {
      onIncreaseQuantity,
      onDecreaseQuantity,
      onDeleteAllBooks
    } = this.props;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{quantity}</td>
        <td>
          <Button
            size="sm"
            onClick={() => onDeleteAllBooks(id)}
            variant="outline-success"
          >
            <FaTrash />
          </Button>
          <Button
            size="sm"
            onClick={() => onIncreaseQuantity(id)}
            variant="outline-warning"
          >
            <FaPlusCircle />
          </Button>
          <Button
            size="sm"
            onClick={() => onDecreaseQuantity(id)}
            variant="outline-danger"
          >
            <FaMinusCircle />
          </Button>
        </td>
      </tr>
    );
  };

  render() {
    const { cartItems } = this.props;

    if (
      cartItems === null ||
      cartItems === undefined ||
      cartItems.length === 0
    ) {
      return <h4 className="empty-cart-title">The cart is empty!</h4>;
    }

    return (
      <Table responsive className="cart-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{cartItems.map(this.renderRow)}</tbody>
      </Table>
    );
  }
}

const mapStateToProps = ({ cart }) => {
  return {
    cartItems: cart.cartItems
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onIncreaseQuantity: bookAddedToCart,
      onDecreaseQuantity: bookRemovedFromCart,
      onDeleteAllBooks: allBooksRemovedFromCart,
      fetchCart: fetchCart
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartList);
