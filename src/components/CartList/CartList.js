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
    const { id, title, count, availableCount } = item;
    const { onIncreaseCount, onDecreaseCount, onDeleteAllBooks } = this.props;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{availableCount}</td>
        <td>{count}</td>
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
            onClick={() => onIncreaseCount(id)}
            variant="outline-warning"
          >
            <FaPlusCircle />
          </Button>
          <Button
            size="sm"
            onClick={() => onDecreaseCount(id)}
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

    return (
      <Table responsive className="cart-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Available</th>
            <th>Count</th>
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
      onIncreaseCount: bookAddedToCart,
      onDecreaseCount: bookRemovedFromCart,
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
