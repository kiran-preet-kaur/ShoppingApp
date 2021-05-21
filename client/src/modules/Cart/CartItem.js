import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = props => {
  const { data, removeCartItem } = props;
  const { productName, productID, productPrice, qty, _id } = data
  return (
    <div className="row">
      <div className="col s3">image</div>
      <div className="col s9">
        <Link to={`/product/${productID}`}>{productName}</Link><i className="material-icons right grey-text text-lighten-1" onClick={() => removeCartItem(_id)} >delete</i>
        <div>Qty: {qty}</div>
        <div>{productPrice}</div>
      </div>
    </div>
  );
};


export default CartItem