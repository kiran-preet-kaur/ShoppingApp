import axios from 'axios';

export const getProducts = (category = '') => async dispatch => {
  try {

    const res = await axios.get('/api/products?category=' + category)


    dispatch({
      type: 'GET_PRODUCTS',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'PRODUCTS_FAIL',
      payload: err.response.statusText
    });
  }
}
