const initialState = {
  cartItems: [],
  totalPrice: 0,
  error: null,
  message: null,
  loader: true
}

const sum = (cartItems) => {
  let sum = 0;
  for (var item of cartItems) {
    sum += parseFloat(item.productPrice);
  }
  return sum;
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.data],
        message: true
      }
    case 'GET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload.data,
        totalPrice: sum(action.payload.data),
        loader: false,
        error: null
      }
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.map(cartItem =>
          cartItem._id === action.payload.data._id ? action.payload.data : cartItem
        ),
        totalPrice: state.totalPrice + action.payload.data.productPrice,
        error: null
      }
    case 'DELETE_CART_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem._id !== action.payload.data._id
        ),
        totalPrice: state.totalPrice - action.payload.data.productPrice
      }
    case 'EMPTY_CART':
      return {
        ...state,
        cartItems: [],
        totalPrice: 0
      }
    case 'CART_GET_FAIL':
      return {
        ...state,
        cartItems: [],
        error: action.payload
      }
    case 'CART_FAIL':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export default cartReducer;