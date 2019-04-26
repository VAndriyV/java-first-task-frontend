import React, { Component } from "react";
import { connect } from "react-redux";
import { withBookService } from "../../../hoc/";
import { compose } from "../../../utils/";
import {
  fetchBooks,
  booksRequested,
  fetchBooksByTitle
} from "../../../../actions/";
import { bindActionCreators } from "redux";
import Spinner from "../../../Spinner/";
import Error from "../../../Error/Error";
import { FaPen } from "react-icons/fa";
import { Row, Table, Button, Col } from "react-bootstrap";
import "./BooksEdit.css";
import InfiniteScroll from "react-infinite-scroller";
import DottedSpinner from "../../../DottedSpinner/DottedSpinner";
import "./BooksEdit.css";

class BooksEdit extends Component {
  state = {
    editMode: false,
    editObject: null,   
    searchQuery: "au"
  };

  componentDidMount() {
    const { booksRequested } = this.props;   
    booksRequested();
    this.fetchCorrectMethod();
  } 
  

  limit = 8;
  offset = 0;
  searchMode  = false;

  activateSearchMode = () => {
    const { booksRequested } = this.props;    
    booksRequested();      
    this.searchMode = true;   
    this.offset =0;
    this.fetchCorrectMethod();
  };

  activateNormalMode = () => {
    const { booksRequested } = this.props;    
    booksRequested();       
    this.searchMode = false;  
    this.offset =0; 
    this.fetchCorrectMethod();
  };

  fetchCorrectMethod() {   
    
    this.fetchByMode();   
  }

  fetchByMode() {
   
    const { fetchBooks, fetchBooksByTitle,hasMore } = this.props;

    const { searchQuery } = this.state;

    if(!hasMore){
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
    this.offset+=this.limit;
  }

  onEditButtonClick = Book => {
    this.setState({
      editMode: true,
      editObject: Book
    });
    if (window.matchMedia("(max-width: 992px)").matches) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  };

  addBook = e => {
    e.preventDefault();
  };

  updateBook = e => {
    e.preventDefault();

    this.setState({
      editMode: false,
      editObject: null
    });
  };

  mapBookItem(item, idx) {
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
            onClick={() => this.onEditButtonClick(item)}
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

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <Error errorMsg={error} />;
    }

    return (
      <Row>
        <Col>
          <button onClick={this.activateSearchMode}>1</button>
          <button onClick={this.activateNormalMode}>2</button>
          <InfiniteScroll
            className="items-container"
            pageStart={0}
            loadMore={() => {
              this.fetchCorrectMethod();
            }}
            hasMore={hasMore}
            loader={<DottedSpinner />}
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
)(BooksEdit);
