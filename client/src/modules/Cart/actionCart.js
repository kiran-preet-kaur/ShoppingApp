import axios from 'axios';

export const addItemToCart = (product, qty = '') => async dispatch => {
  try {

    const res = await axios({
      method: 'POST',
      url: '/api/cart',
      headers: {
        "x-auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      data: {
        product: product,
        qty: qty
      }
    })


    dispatch({
      type: 'ADD_CART_ITEM',
      payload: res
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'CART_FAIL',
      payload: err.response.statusText
    });
  }
}
export const getCartItems = () => async dispatch => {
  try {

    const res = await axios({
      method: 'GET',
      url: '/api/cart',
      headers: {
        "x-auth-token": localStorage.getItem('token')
      }
    })


    dispatch({
      type: 'GET_CART_ITEMS',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'CART_GET_FAIL',
      payload: err.response.statusText
    });
  }
}
export const updateCartItem = (cartID, qty) => async dispatch => {
  try {

    const res = await axios({
      method: 'PUT',
      url: `/api/cart/${cartID}`,
      headers: {
        "x-auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      data: {
        qty: qty
      }
    })


    dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'CART_FAIL',
      payload: err.response.statusText
    });
  }
}

export const removeCartItem = (cartID) => async dispatch => {
  try {

    const res = await axios({
      method: 'DELETE',
      url: `/api/cart/${cartID}`,
      headers: {
        "x-auth-token": localStorage.getItem('token')
      }
    })


    dispatch({
      type: 'DELETE_CART_ITEM',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'CART_FAIL',
      payload: err.response.statusText
    });
  }
}