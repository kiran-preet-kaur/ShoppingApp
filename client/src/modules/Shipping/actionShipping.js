import axios from 'axios';

export const getAddress = () => async dispatch => {
  try {

    const res = await axios({
      method: 'GET',
      url: '/api/address',
      headers: { 'x-auth-token': localStorage.getItem('token') }
    })

    dispatch({
      type: 'GET_ADDRESS',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'ADDRESS_FAIL',
      payload: err.response.statusText
    });
  }
}

export const addAddress = (name, phone, pinCode, address, city, state, addressType) => async dispatch => {
  try {

    const res = await axios({
      method: 'POST',
      url: '/api/address',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      data: {
        name, phone, pinCode, address, city, state, addressType
      }
    })

    dispatch({
      type: 'ADD_ADDRESS',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'ADDRESS_FAIL',
      payload: err.response.statusText
    });
  }
}

export const deleteAddress = (addressID) => async dispatch => {
  try {

    const res = await axios({
      method: 'DELETE',
      url: `/api/address/${addressID}`,
      headers: {
        "x-auth-token": localStorage.getItem('token')
      }
    })


    dispatch({
      type: 'DELETE_ADDRESS',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'ADDRESS_FAIL',
      payload: err.response.statusText
    });
  }
}

export const updateAddress = (addressID, name, phone, pinCode, address, city, state, addressType) => async dispatch => {
  try {

    const res = await axios({
      method: 'PUT',
      url: `/api/address/${addressID}`,
      headers: {
        "x-auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      data: {
        name, phone, pinCode, address, city, state, addressType
      }
    })

    dispatch({
      type: 'UPDATE_ADDRESS',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'CART_FAIL',
      payload: err.response.statusText
    });
  }
}

export const changeSelectedAddress = (addressObject) => async dispatch => {
  dispatch({
    type: 'CHANGE_SELECTED_ADDRESS',
    payload: addressObject
  })
}