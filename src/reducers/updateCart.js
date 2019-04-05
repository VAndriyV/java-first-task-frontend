const updateItemsArray = (cartItems, item, idx) => {
  if (item.count === 0) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }

  if (idx === -1) {
    return [...cartItems, item];
  }

  return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};

const updateItem = (item, count) => {
  item.count += count;
  return item;
};

const updateCartItems = (state, bookId, count) => {
  const {
    cart: { cartItems }
  } = state;
  const book = cartItems.find(({ id }) => bookId === id);
  const index = cartItems.findIndex(({ id }) => book.id === id);
  const item = cartItems[index];
  let newItem = item;

  if (!(item.count === item.availableCount && count === 1))
    newItem = updateItem(item, count);

  const newCartItems = updateItemsArray(cartItems, newItem, index);

  localStorage.setItem("cart", JSON.stringify(newCartItems));

  return {
    cartItems: newCartItems
  };
};

const updateCartItemsAvailability = (state, booksAvailability) => {
  const {
    cart: { cartItems }
  } = state;

  let updatedList = cartItems.map(item => {
    const count =
      item.count > booksAvailability[item.id]
        ? booksAvailability[item.id]
        : item.count;
    return {
      id: item.id,
      title: item.title,
      availableCount: booksAvailability[item.id],
      count: count
    };
  });

  updatedList = updatedList.filter(item => item.availableCount > 0);

  localStorage.setItem("cart", JSON.stringify(updatedList));

  return {
    cartItems: updatedList
  };
};

const addBookToCartFromList = (state, book) => {
  const {
    cart: { cartItems }
  } = state;

  let storage = localStorage.getItem("cart");

  if (book.availableCount === 0) {
    return {
      cartItems
    };
  }

  let newCart;
  if (storage === null) {
    newCart = [];
    newCart.push({
      id: book.id,
      title: book.title,
      availableCount: book.availableCount,
      count: 1
    });
  } else {
    newCart = JSON.parse(localStorage.getItem("cart"));
    let record = newCart.find(el => el.id === book.id);
    if (record === undefined) {
      newCart.push({
        id: book.id,
        title: book.title,
        availableCount: book.availableCount,
        count: 1
      });
    } else {
      let idx = newCart.findIndex(el => el.id === book.id);
      newCart[idx].count++;
    }
  }
  localStorage.setItem("cart", JSON.stringify(newCart));

  return {
    cartItems: newCart
  };
};

const updateCart = (state, action) => {
  if (state === undefined) {
    return {
      cartItems: []
    };
  }

  switch (action.type) {
    case "BOOK_ADDED_TO_CART_FROM_LIST":
      return addBookToCartFromList(state, action.payload);

    case "BOOK_ADDED_TO_CART":
      return updateCartItems(state, action.payload, 1);

    case "BOOK_REMOVED_FROM_CART":
      return updateCartItems(state, action.payload, -1);

    case "ALL_BOOKS_REMOVED_FROM_CART":
      const item = state.cart.cartItems.find(({ id }) => id === action.payload);
      return updateCartItems(state, action.payload, -item.count);

    case "FETCH_CART_NOT_EMPTY":
      return {
        cartItems: action.payload
      };

    case "FETCH_CART_EMPTY":
      return {
        cartItems: []
      };
    case "UPDATE_AVAILABILITY":
      return updateCartItemsAvailability(state, action.payload);

    default:
      return state.cart;
  }
};

export default updateCart;
