import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import { FiPlusSquare } from 'react-icons/fi';
import './BookListItem.css';
export default class BookListItem extends Component {

  render() {

    const { title, author, genre, year, availableCount } = this.props.book;
    const onAddedToCart = this.props.onAddedToCart;

    return (
      <Col xs={12} sm={6} md={4} lg={3} className="single-card" >
        <Card border="dark" style={{ width: '100%' }} className="h-100">
          <Card.Header>{author.firstName + " " + author.lastName + ", " + year} </Card.Header>
          <Card.Body>
            <FiPlusSquare size={30} className='add-book-icon' onClick={onAddedToCart} />
            <Card.Title className='book-title'>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{genre.name}</Card.Subtitle>
            <Card.Text>
              Available in the library: {availableCount}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
