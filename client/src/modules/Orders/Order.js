import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OrderItem from './OrderItem'

import Loader from '../../layouts/Loader';

class Orders extends Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this.props.getOrder(this.props.match.params.id);
  }

  render() {
    const { order, loading, error } = this.props;
    if (!localStorage.getItem('token')) {
      return <Redirect to='/login' />
    }
    else if (loading) {
      return <Loader />
    } else if (error) {
      return <div>Error loading this page. Please try again later!</div>
    } else {
      return (
        order && <>
          <h5 className="center" style={{ fontWeight: "bold" }}>Order Details</h5>
          <div>
            <div>Order ID #{order.orderID}</div>
            <div><span>Status:</span> <span>{order.status == 1 ? "Order Placed" : "Order Delivered"}</span></div>
          </div>


          {order.orderItems.map((orderItem) => {
            return <div key={orderItem._id} className="row" style={{ marginTop: "10px" }}>
              <img className="col s5" src={orderItem.image} style={{ maxWidth: "250px", maxHeight: "250px" }} />
              <div className="col s7">
                <div>{orderItem.name}</div>
                <div>{orderItem.qty} x ₹ {orderItem.price}</div>
              </div>
            </div>
          })}

          <div style={{ marginTop: "5px", marginBottom: "5px", fontWeight: "bold" }} >Delivery Address</div>
          <div><span>{order.toName}</span>        <span style={{ paddingLeft: "10px" }}>Ph: {order.phone}</span></div>
          <div>
            {order.address}, {order.city} </div><div>
            {order.state} - {order.pinCode}
          </div>

          <div>
            <span>Total Order Amount: </span> <span>₹ {order.price}</span>
          </div>
        </>
      );
    }
  }
}

export default Orders