const initialState = {
  products: null,
  error: null
}

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload.data
      }
    case 'PRODUCTS_FAIL':
      return {
        ...state,
        products: null,
        error: action.payload
      }
    default:
      return state;
  }
};

export default listingReducer;