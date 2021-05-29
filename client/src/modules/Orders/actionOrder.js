import axios from 'axios';

export const getOrders = () => async dispatch => {
  try {

    const res = await axios({
      method: 'GET',
      url: '/api/orders',
      headers: { 'x-auth-token': localStorage.getItem('token') }
    })

    dispatch({
      type: 'GET_ORDERS',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'ORDER_FAIL',
      payload: err.response.statusText
    });
  }
}

export const getOrder = (id) => async dispatch => {
  try {

    const res = await axios({
      method: 'GET',
      url: `/api/orders/${id}`,
      headers: { 'x-auth-token': localStorage.getItem('token') }
    })

    dispatch({
      type: 'GET_ORDER',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'ORDER_FAIL',
      payload: err.response.statusText
    });
  }
}