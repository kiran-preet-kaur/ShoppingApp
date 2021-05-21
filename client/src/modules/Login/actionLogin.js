import axios from 'axios';

export const getLogin = (email, password) => async dispatch => {
  try {

    console.log(email);
    console.log(password);

    const res = await axios.post('/api/login', {
      email: email,
      password: password
    });

    console.log(res);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res
    });
    dispatch(getUser());
  } catch (err) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: err.response.statusText
    });
  }
}

export const getUser = () => async dispatch => {
  try {


    const res = await axios({
      method: 'GET',
      url: '/api/login',
      headers: { 'x-auth-token': localStorage.getItem('token') }
    })

    console.log(res);

    dispatch({
      type: 'USER_SUCCESS',
      payload: res
    });
  } catch (err) {
    dispatch({
      type: 'USER_FAILURE',
      payload: err.response.statusText
    });
  }
}

export const registerUser = (name, email, password, phone) => async dispatch => {
  try {


    const res = await axios({
      method: 'POST',
      url: '/api/users',
      data: {
        name,
        email,
        password,
        phone
      }
    })

    console.log(res);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res
    });
    dispatch(getUser());
  } catch (err) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: err.response.statusText
    });
  }
}