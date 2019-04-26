const updateAuthorsList = (state, action) => {   
   
    if (state === undefined) {
      return {
        authors: [],
        loading: true,
        error: null
      };
    }  
  
    switch (action.type) {
      case 'FETCH_AUTHORS_REQUEST':
        return {
          authors:[],
          loading: true,
          error: null
        };
  
      case 'FETCH_AUTHORS_SUCCESS':      
        return {
          authors:action.payload,
          loading: false,
          error: null
        };
  
      case 'FETCH_AUTHORS_FAILURE':
        return {
          authors: [],
          loading: false,
          error: action.payload
        };
      
      case 'ADD_AUTHOR_ERROR':
        return{
          authors: state.authorsList.authors,
          error:action.payload,
          loading:false
        };
  
      default:
        return state.authorsList;
    }
  };

  export default updateAuthorsList;