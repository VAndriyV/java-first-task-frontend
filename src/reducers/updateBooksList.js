

const updateBooksList = (state, action) => {


  if (state === undefined) {
    return {
      hasMore: false,
      books: [],
      loading: true,
      errorMsg: null,
      offsetCoef: 1
    };
  }

  switch (action.type) {
    
    case 'FETCH_BOOKS_REQUEST':
    console.log(state.booksList.offsetCoef);      
      return {
        hasMore: false,
        books: [],
        loading: true,
        errorMsg: null,
        offsetCoef: 1
      };

    case 'FETCH_BOOKS_SUCCESS':     
      return {
        hasMore: action.payload.hasMore,
        books: state.booksList.books.concat(action.payload.books),
        loading: false,
        error: null,
        offsetCoef: action.payload.hasMore ? state.booksList.offsetCoef + 1 : 1
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        hasMore: false,
        books: [],
        loading: false,
        error: action.payload,
        offsetCoef: 1
      };

    default:
      return state.booksList;
  }
};

export default updateBooksList;
