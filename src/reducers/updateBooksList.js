const updateBooksList = (state, action) => {
  
  if (state === undefined) {
    return {
      hasMore: true,
      books: [],
      loading: true,
      errorMsg: null     
    };
  }

  switch (action.type) {
    
    case 'FETCH_BOOKS_REQUEST':
   
      return {
        hasMore: false,
        books: [],
        loading: true,
        errorMsg: null       
      };

    case 'FETCH_BOOKS_SUCCESS':     
   
      return {
        hasMore: action.payload.hasMore,
        books: state.booksList.books.concat(action.payload.books),
        loading: false,
        error: null
       
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        hasMore: false,
        books: [],
        loading: false,
        error: action.payload       
      };

    default:
      return state.booksList;
  }
};

export default updateBooksList;