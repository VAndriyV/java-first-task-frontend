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
import { withBookService } from "../hoc";
import { compose } from "../utils";
import { bindActionCreators } from "redux";
import { Row } from "react-bootstrap";
import Spinner from "../Spinner";
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

  componentDidUpdate(prevProps) {
    if (
      this.props.location !== prevProps.location ||
      prevProps.location === undefined
    ) {
      const { booksRequested } = this.props;      
      this.offset = 0;
      booksRequested();
      this.fetchCorrectMethod();
    }
  }

  limit = 8;
  offset = 0;

  fetchCorrectMethod = () => {
    const{
      books,
      hasMore
    } = this.props;

    const { booksRequested } = this.props;

    if (hasMore && !(books.length > this.limit && this.offset === 0)) {     
      this.fetchByProps();
      this.offset += this.limit;
    } else if (!hasMore) {
      booksRequested();
      this.fetchByProps();
    }
    else{
      booksRequested();
      this.fetchByProps();
    }
    
  };

  fetchByProps(){
    const{
      fetchBooks,
      fetchBooksByGenre,
      genre,
      authorId,
      fetchBooksByAuthorId     
    } = this.props;

    if (genre !== undefined) {
      fetchBooksByGenre(this.limit, this.offset, genre);
    } else if (authorId !== undefined) {
      fetchBooksByAuthorId(this.limit, this.offset, authorId);
    } else {
      fetchBooks(this.limit, this.offset);
    }
  }  
  render() {
    const {
      books,
      loading,
      error,
      onAddedToCart,
      hasMore,
      location
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <Error errorMsg={error} />;
    }

    return (
      <Row>
        <InfiniteScroll
          key={location}
          className="items-container"
          pageStart={0}
          loadMore={() => {
            this.fetchCorrectMethod();
          }}
          hasMore={hasMore}
          loader={<DottedSpinner key={0}/>}
        >
          {books.map((book,idx) => {
            return (
              <BookListItem key={idx}
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
    hasMore: booksList.hasMore   
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
