import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ order }) => {
  const { orderItems, _id } = order;
  return (
    <div>
      {orderItems.map((order) => {
        return <Link key={order._id} className="row" to={`/order/${_id}`}>
          <div className="col s5"><img src={order.image} height="125px" width="125px" /></div>
          <div className="col s7 black-text">
            <div>{order.name}</div>
            <div>Qty: {order.qty}</div>
          </div>
        </Link>
      })}
    </div>
  );
};



export default OrderItem;