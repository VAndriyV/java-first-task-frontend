import React, { Component } from "react";
import BookListItem from "../BookListItem/BookListItem";
import { connect } from "react-redux";
import {
  fetchBooks,
  bookAddedToCartFromList,
  booksRequested,
  fetchBooksByGenre,
  fetchBooksByAuthorId
} from "../../actions";
import { withBookService } from "../hoc/";
import { compose } from "../utils/";
import { bindActionCreators } from "redux";
import { Row } from "react-bootstrap";
import Spinner from "../Spinner/";
import InfiniteScroll from "react-infinite-scroller";
import DottedSpinner from "../DottedSpinner/DottedSpinner";
import Error from "../Error/Error";
import "./BooksList.css";

class BooksList extends Component {
  componentDidMount() {
    const { booksRequested } = this.props;
    booksRequested();
    this.fetchCorrectMethod();
  }

  componentWillUnmount(){
    const { booksRequested } = this.props;
    booksRequested();
  }

  fetchCorrectMethod = () => {   
    const {
      fetchBooks,
      offsetCoef,
      fetchBooksByGenre,
      genre,
      authorId,
      fetchBooksByAuthorId 
    } = this.props;
  
    if (genre !== undefined) {   
      fetchBooksByGenre(this.limit, this.limit * (offsetCoef - 1), genre);
    } else if (authorId !== undefined) {         
      fetchBooksByAuthorId(this.limit, this.limit * (offsetCoef - 1), authorId);
    } else {         
      fetchBooks(this.limit, this.limit * (offsetCoef - 1));
    }
  };

  limit = 8;

  render() {
    const { books, loading, error, onAddedToCart, hasMore } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <Error errorMsg={error} />;
    }

    return (
      <Row>
        <InfiniteScroll
          className="items-container"
          pageStart={0}
          loadMore={() => {
            this.fetchCorrectMethod();
          }}
          hasMore={hasMore}
          loader={<DottedSpinner />}
        >
          {books.map(book => {
            return (
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(book)}
              />
            );
          })}
        </InfiniteScroll>
      </Row>
    );
  }
}

const mapStateToProps = ({ booksList }) => {
  return {
    books: booksList.books,
    loading: booksList.loading,
    error: booksList.error,
    hasMore: booksList.hasMore,
    offsetCoef: booksList.offsetCoef
  };
};

const mapDispatchToProps = (dispatch, { bookService }) => {
  return bindActionCreators(
    {
      fetchBooks: fetchBooks(bookService),
      booksRequested: booksRequested,
      onAddedToCart: bookAddedToCartFromList,
      fetchBooksByGenre: fetchBooksByGenre(bookService),
      fetchBooksByAuthorId: fetchBooksByAuthorId(bookService)
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
)(BooksList);
