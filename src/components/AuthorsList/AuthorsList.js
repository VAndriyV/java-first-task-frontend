import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withBookService } from '../hoc/';
import { compose } from '../utils/';
import { fetchAuthors } from '../../actions/';
import { bindActionCreators } from 'redux';
import Spinner from '../Spinner/';
import './AuthorsList.css';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AuthorsList extends Component {

  componentDidMount() {
    this.props.fetchAuthors();
  }


  sortByFirstName(authors) {
    authors.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
  }

  extractLetters(authors) {
    let letters = new Set();
    authors.forEach(a => letters.add(a.firstName[0]));
    return letters;
  }

  mapAuthorsList(authors, letters) {

    let idx = 0;
    let data = {};

    letters.forEach((element, index, array) => {
      let temp = [];
      while (idx < authors.length && authors[idx].firstName[0] === element) {
        temp.push(authors[idx]);
        idx++;
      }
      data[element] = temp;

    });

    return this.buildMarkup(data);

  }

  buildMarkup(data) {

    return Object.keys(data).map(key => {
      return (
        <Col xs={12} sm={6} md={4} lg={3} className='list-item'>
          <h5 className='list-header'>{key}</h5>
          <ul className='authors-list'>
            {

              data[key].map(val => {
                return (
                  <li><Link to={"/books/byauthor/" + val.id}>{val.firstName + " " + val.lastName}</Link></li>
                )
              })
            }
          </ul>
        </Col>
      );
    })
  }

  render() {

    const { authors, loading, error } = this.props;

    if (loading) {
      return <Spinner />
    }

    if (error) {
      console.log("error");
      return null;
    }

    this.sortByFirstName(authors);


    return this.mapAuthorsList(authors, this.extractLetters(authors));


  }
}
const mapStateToProps = ({ authorsList }) => {
  return {
    authors: authorsList.authors,
    loading: authorsList.loading,
    error: authorsList.error
  }
};

const mapDispatchToProps = (dispatch, { bookService }) => {
  return bindActionCreators({
    fetchAuthors: fetchAuthors(bookService),
  }, dispatch);
};

export default compose(
  withBookService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorsList);