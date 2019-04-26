export const booksRequested = () => {
  return {
    type: "FETCH_BOOKS_REQUEST"
  };
};

const booksLoaded = data => {
  return {
    type: "FETCH_BOOKS_SUCCESS",
    payload: data
  };
};

const booksError = error => {
  return {
    type: "FETCH_BOOKS_FAILURE",
    payload: error
  };
};

export const bookAddedToCart = bookId => {
  return {
    type: "BOOK_ADDED_TO_CART",
    payload: bookId
  };
};

export const bookAddedToCartFromList = book => {
  return {
    type: "BOOK_ADDED_TO_CART_FROM_LIST",
    payload: book
  };
};

export const bookRemovedFromCart = bookId => {
  return {
    type: "BOOK_REMOVED_FROM_CART",
    payload: bookId
  };
};

export const allBooksRemovedFromCart = bookId => {
  return {
    type: "ALL_BOOKS_REMOVED_FROM_CART",
    payload: bookId
  };
};

export const fetchCartNotEmpty = cart => {
  return {
    type: "FETCH_CART_NOT_EMPTY",
    payload: cart
  };
};

export const fetchCartEmpty = () => {
  return {
    type: "FETCH_CART_EMPTY"
  };
};

export const updateCartItemsAvailability = updatedList => {
  return {
    type: "UPDATE_AVAILABILITY",
    payload: updatedList
  };
};

const loginSuccess = email => {
  return {
    type: "LOGIN_SUCCESS",
    payload: email
  };
};

const loginFailure = errorMsg => {
  return {
    type: "LOGIN_FAILURE",
    payload: errorMsg
  };
};

const registrationSuccess = message => {
  return {
    type: "REGISTRATION_SUCCESS",
    payload: message
  };
};

const registrationFailure = errorMsg => {
  return {
    type: "REGISTRATION_FAILURE",
    payload: errorMsg
  };
};

const userIsLoggedIn = email => {
  return {
    type: "USER_IS_LOGGED_IN",
    payload: email
  };
};

const userIsGuest = () => {
  return {
    type: "USER_IS_GUEST"
  };
};

export const resetMessage = () => {
  return {
    type: "RESET_MESSAGE"
  };
};

const doLogout = () => {
  return {
    type: "LOGOUT"
  };
};

const fetchBooks = bookService => (limit, offset) => dispatch => {   
  bookService
    .getBooksRange(limit, offset)
    .then(data => dispatch(booksLoaded(data)))
    .catch(err => dispatch(booksError(err)));
};

const fetchBooksByGenre = bookService => (limit, offset, genre) => dispatch => {
  bookService
    .getBooksByGenre(genre, limit, offset)
    .then(data => dispatch(booksLoaded(data)))
    .catch(err => dispatch(booksError(err)));
};

const fetchBooksByAuthorId = bookService => (
  limit,
  offset,
  authorId
) => dispatch => {
  bookService
    .getBooksByAuthorId(authorId, limit, offset)
    .then(data => dispatch(booksLoaded(data)))
    .catch(err => dispatch(booksError(err)));
};

const login = bookService => userLoginData => dispatch => {
  bookService
    .login(userLoginData)
    .then(token => {
      dispatch(loginSuccess(token));
      console.log(token);
    })
    .catch(err => dispatch(loginFailure(err)));
};

const registration = bookService => userRegistrationData => dispatch => {
  bookService
    .registration(userRegistrationData)
    .then(message => dispatch(registrationSuccess(message)))
    .catch(err => dispatch(registrationFailure(err)));
};

const logout = () => dispatch => {
  dispatch(doLogout());
};

const checkUserStatus = bookService => () => dispatch => {
  bookService
    .checkIsLoggedIn()
    .then(email => {
      dispatch(userIsLoggedIn(email));
      console.log("authorized");
    })
    .catch(e => {
      dispatch(userIsGuest());
      console.log("NoNauthorized");
    });
};

const authorsRequested = () => {
  return {
    type: "FETCH_AUTHORS_REQUEST"
  };
};

const authorsLoaded = authors => {
  return {
    type: "FETCH_AUTHORS_SUCCESS",
    payload: authors
  };
};

const authorsError = error => {
  return {
    type: "FETCH_AUTHORS_FAILURE",
    payload: error
  };
};

const fetchAuthors = bookService => () => dispatch => {  
  dispatch(authorsRequested());
  bookService
    .getAuthors()
    .then(data => dispatch(authorsLoaded(data)))
    .catch(err => dispatch(authorsError(err)));
};

const fetchCart = () => dispatch => {
  const cart = localStorage.getItem("cart");

  if (cart === undefined || cart === null || cart.length === 0) {
    dispatch(fetchCartEmpty());
  } else {
    dispatch(fetchCartNotEmpty(JSON.parse(cart)));
  }
};

const updateAvailability = bookService => () => dispatch => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const arrayToSend = cart.map(item => item.id);

  bookService.getAvailability(arrayToSend).then(items => {
    console.log(items);
    dispatch(updateCartItemsAvailability(items));
  });
};

const addAuthorError = error=>{
  return{
    type: 'ADD_AUTHOR_ERROR',
    payload: error
  }
};

const updateAuthorError = error=>{
  return{
    type: 'UPDATE_AUTHOR_ERROR',
    payload: error
  }
};

const addAuthor =  bookService => (author) => dispatch => {
  bookService.addAuthor(author)
  .then(()=>fetchAuthors(bookService)()(dispatch))
  .catch(e=>dispatch(addAuthorError(e)));
};

const updateAuthor =  bookService => (author) => dispatch => {
  bookService.updateAuthor(author)
  .then(()=>fetchAuthors(bookService)()(dispatch))
  .catch(e=>dispatch(updateAuthorError(e)));
};

const fetchBooksByTitle = bookService => (limit, offset, title) => dispatch => {  
  bookService
    .getBooksByTitle(title, limit, offset)
    .then(data => dispatch(booksLoaded(data)))
    .catch(err => dispatch(booksError(err)));
};

export {
  fetchBooks,
  fetchAuthors,
  fetchCart,
  fetchBooksByGenre,
  fetchBooksByAuthorId,
  login,
  registration,
  logout,
  checkUserStatus,
  updateAvailability,
  addAuthor,
  updateAuthor,
  fetchBooksByTitle
};
