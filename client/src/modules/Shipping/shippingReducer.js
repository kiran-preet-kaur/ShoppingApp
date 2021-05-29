const initialState = {
  addresses: [],
  selectedAddress: {},
  error: null,
  loader: true
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ADDRESS':
      return {
        ...state,
        addresses: [...state.addresses, action.payload.data],
        selectedAddress: action.payload.data
      }
    case 'GET_ADDRESS':
      return {
        ...state,
        addresses: action.payload.data,
        loader: false,
        selectedAddress: action.payload.data[0]
      }
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map(cartItem =>
          cartItem._id === action.payload.data._id ? action.payload.data : cartItem
        ),
        selectedAddress: action.payload.data
      }
    case 'DELETE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter(
          cartItem => cartItem._id !== action.payload.data._id
        )
      }
    case 'CHANGE_SELECTED_ADDRESS':
      return {
        ...state,
        selectedAddress: action.payload
      }
    case 'CART_GET_FAIL':
      return {
        ...state,
        addresses: [],
        error: action.payload
      }
    case 'ADDRESS_FAIL':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export default cartReducer;