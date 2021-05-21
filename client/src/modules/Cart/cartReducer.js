const initialState = {
  cartItems: [],
  error: null,
  loader: true
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.data]
      }
    case 'GET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload.data,
        loader: false
      }
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.map(cartItem =>
          cartItem._id === action.payload.data._id ? action.payload.data : cartItem
        )
      }
    case 'DELETE_CART_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem._id !== action.payload.data._id
        )
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