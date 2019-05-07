import React, { Component } from 'react';
import './App.css';
import Layout from "../Layout/Layout";
import { Route, Switch } from "react-router";
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import BooksPage from '../pages/BooksPage/BooksPage';
import AuthorsPage from '../pages/AuthorsPage/AuthorsPage';
import { fetchCart } from '../../actions/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { withBookService } from '../hoc/';
import { compose } from '../utils/';
import { checkUserStatus } from '../../actions';
import CartPage from '../pages/CartPage/CartPage';
import AuthorsEditPage from '../pages/Admin/AuthorsEditPage/AuthorsEditPage';
import BooksEditPage from '../pages/Admin/BooksEditPage/BooksEditPage';
import UserBooksEditPage from '../pages/Admin/UserBooksEditPage/UserBooksEditPage';
import OrderedBooksPage from '../pages/OrderedBooksPage/OrderedBooksPage';

class App extends Component {

  componentDidMount() {
    this.props.fetchCart();
    this.props.checkUserStatus();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/registration" exact component={RegistrationPage} />
            <Route path="/books/" exact render={(props) => (
              <BooksPage location={window.location.pathname} {...props} />)} />
            <Route path="/books/bygenre/:genre" exact render={(props) => (
              <BooksPage location={window.location.pathname} genre={props.match.params.genre} {...props} />)} />
            <Route path="/books/byauthor/:authorId" exact render={(props) => (
              <BooksPage location={window.location.pathname} authorId={props.match.params.authorId} {...props} />)} />
            <Route path="/authors" exact component={AuthorsPage} />
            <Route path="/cart" exact component={CartPage} />
            <Route path="/admin/authors" exact component={AuthorsEditPage} />
            <Route path="/admin/books" exact component={BooksEditPage} />
            <Route path="/admin/userBooks" exact component={UserBooksEditPage} />
            <Route path="/orderedBooks" exact component={OrderedBooksPage}/>
            <Route component={HomePage} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({userStatus}) => {
  return {
    isLoggedIn: userStatus.isLoggedIn,
    roleId:userStatus.roleId
  }
};

const mapDispatchToProps = (dispatch, { bookService }) => {

  return bindActionCreators({
    fetchCart: fetchCart,
    checkUserStatus: checkUserStatus(bookService)
  }, dispatch);
};

export default compose(
  withBookService(),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
