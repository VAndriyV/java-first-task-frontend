
import updateBooksList from './updateBooksList';
import updateAuthorsList from './updateAuthorsList';
import updateCart from './updateCart';
import updateUserStatus from './updateUserStatus';
import adminOperations from './adminOperations';
import updateUserBooks from './updateUserBooks';

const reducer = (state, action) => {
   return {
     booksList: updateBooksList(state, action),
     authorsList: updateAuthorsList(state, action),
     cart: updateCart(state,action),
     userStatus: updateUserStatus(state,action),
     adminOperations: adminOperations(state,action),
     userBooks: updateUserBooks(state,action)
   };
 };


export default reducer;