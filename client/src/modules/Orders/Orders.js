import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OrderItem from './OrderItem'

import Loader from '../../layouts/Loader';

class Orders extends Component {
  constructor(...args) {
    super(...args);
    this.state = { loading: true, orders: null, error: null }
  }

  sendOrdersRequest = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/orders',
        headers: { 'x-auth-token': localStorage.getItem('token') }
      })

      this.setState({
        orders: res.data,
        loading: false
      })

    } catch (err) {
      this.setState({
        error: err.response,
        loading: false
      })

    }
  }

  componentDidMount() {
    this.sendOrdersRequest();
  }

  render() {
    const { user } = this.props;
    const { orders, error, loading } = this.state;
    if (!user) {
      return <Redirect to='/login' />
    }
    else if (loading) {
      return <Loader />
    } else if (error) {
      <div>Error loading this page. Please try again later!</div>
    } else if (orders.length < 1) {
      <div>You have no orders yet.</div>
    } else {
      return (
        orders && <div>{orders.map((order) => <OrderItem key={order._id} order={order} />)}</div>
      );
    }
  }
}

export default Orders