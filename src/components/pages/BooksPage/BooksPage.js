import React, { Component } from 'react';
import BooksList from '../../BooksList/BooksList';
import { Row, Col } from 'react-bootstrap';
import { FiPlusSquare } from 'react-icons/fi';
import './BooksPage.css';
export default class BooksPage extends Component {

    render() {
        const { genre, authorId,location } = this.props; 
        
        let header = null;
    
        if(genre){
            header = "Books by " + genre + " genre";
        }
        else if(authorId){
            header = "Authors book";
        }
        else{
            header = "All books";
        }
        
        return (
            <React.Fragment>
                <Row>
                    <Col xs={12} className="all-books-title">
                        <h4>{header}</h4>
                        <p>Click <FiPlusSquare size={24} /> to add book to cart</p>
                    </Col>
                </Row>
                <BooksList location={location.pathname} genre={genre} authorId={authorId} />
            </React.Fragment>
        );
    }
}