import React from 'react';

const OrderItem = ({ order }) => {
  const { _id, productName, category, price, date, status } = order;
  return (
    <div className="row">
      <div className="col s12">
        <div>{productName}</div>
        <div>{price}</div>
      </div>

    </div>
  );
};



export default OrderItem;