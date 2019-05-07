import React, { Component } from "react";
import { connect } from "react-redux";
import { withBookService } from "../../../../hoc";
import { compose } from "../../../../utils";
import {
  fetchBooks,
  booksRequested,
  fetchBooksByTitle 
} from "../../../../../actions";
import { bindActionCreators } from "redux";
import Spinner from "../../../../Spinner";
import Error from "../../../../Error/Error";
import { FaPen } from "react-icons/fa";
import { Row, Table, Button, Col, FormControl } from "react-bootstrap";
import "./BooksEditList.css";
import InfiniteScroll from "react-infinite-scroller";
import DottedSpinner from "../../../../DottedSpinner/DottedSpinner";
import "./BooksEditList.css";

class BooksEditList extends Component {
  state = {
    searchQuery: ''
  };

  componentDidMount() {
    const { booksRequested } = this.props;
    booksRequested();
    this.fetchCorrectMethod();
  }

  onInputChange = (e) => {
    this.setState({
      searchQuery: e.target.value
    });   
  };

  limit = 8;
  offset = 0;
  searchMode = false;

  activateSearchMode = () => {
    const { booksRequested } = this.props;
    booksRequested();
    this.searchMode = true;
    this.offset = 0;
    this.fetchCorrectMethod();
  };

  activateNormalMode = () => {
    const { booksRequested } = this.props;
    booksRequested();
    this.searchMode = false;
    this.offset = 0;
    this.fetchCorrectMethod();
  };

  fetchCorrectMethod() {

    this.fetchByMode();
  }

  fetchByMode() {

    const { fetchBooks, fetchBooksByTitle, hasMore } = this.props;

    const { searchQuery } = this.state;

    if (!hasMore) {
      this.offset = 0;
    }
    if (this.searchMode) {
      fetchBooksByTitle(
        this.limit,
        this.offset,
        searchQuery
      );
    } else {
      fetchBooks(this.limit, this.offset);
    }
    this.offset += this.limit;
  }

  mapBookItem(item, idx) {
    const { onEdit } = this.props;
    return (
      <tr key={item.id}>
        <td>{idx + 1}</td>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.year}</td>
        <td>{item.genre.id}</td>
        <td>{item.genre.name}</td>
        <td>{item.author.id}</td>
        <td>{item.author.firstName + " " + item.author.lastName}</td>
        <td>{item.totalCount}</td>
        <td>{item.availableCount}</td>
        <td>
          <Button
            size="sm"
            onClick={() => onEdit(item)}
            variant="outline-warning"
          >
            <FaPen />
          </Button>
        </td>
      </tr>
    );
  }

  render() {
    const { books, loading, error, hasMore } = this.props;  

    return (
      <Row>
        <Col>
          <Col className="search-placeholder">
            <FormControl placeholder="Book title" type="text" name="query" onInput={this.onInputChange} />
            <Button variant="outline-dark" type="button" onClick={this.activateSearchMode}>
              Search
                </Button>
            <Button variant="outline-dark" type="button" onClick={this.activateNormalMode}>
              Show all
                </Button>
          </Col>
          {loading ? <Spinner /> :
            error ? <Error errorMsg={error} /> :
              <InfiniteScroll
                className="items-container"
                pageStart={0}
                loadMore={() => {
                  this.fetchCorrectMethod();
                }}
                hasMore={hasMore}
                loader={<DottedSpinner key={0}/>}
              >
                <Table responsive className="books-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>id</th>
                      <th>Title</th>
                      <th>Year</th>
                      <th>Genre id</th>
                      <th>Genre</th>
                      <th>Author id</th>
                      <th>Author</th>
                      <th>Total count</th>
                      <th>Available count</th>
                      <th>Edit</th>
                    </tr>
                  </thead>

                  <tbody>
                    {books.map((item, idx) => {
                      return this.mapBookItem(item, idx);
                    })}
                  </tbody>
                </Table>
              </InfiniteScroll>

          }
        </Col>
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
      fetchBooksByTitle: fetchBooksByTitle(bookService)
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
)(BooksEditList);
