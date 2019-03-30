
import updateBooksList from './updateBooksList';
import updateAuthorsList from './updateAuthorsList';
import updateCart from './updateCart';
import updateUserStatus from './updateUserStatus';

const reducer = (state, action) => {
   return {
     booksList: updateBooksList(state, action),
     authorsList: updateAuthorsList(state, action),
     cart: updateCart(state,action),
     userStatus: updateUserStatus(state,action)
   };
 };


export default reducer;