const initialState = {
  orders: [],
  order: null,
  error: null,
  loader: true
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDERS':
      return {
        ...state,
        orders: action.payload.data,
        loader: false,
        error: null
      }
    case 'GET_ORDER':
      return {
        ...state,
        order: action.payload.data,
        loader: false,
        error: null
      }
    case 'ORDER_FAIL':
      return {
        ...state,
        error: action.payload,
        loader: false
      }
    default:
      return state;
  }
};

export default cartReducer;