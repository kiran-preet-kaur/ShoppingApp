import React from 'react';
import { Link } from 'react-router-dom';

const AddToCart = props => {
  const { productID, addItemToCart, error, isAuthenticated } = props;
  if (!isAuthenticated) {
    return <>
      You are not logged in. <Link to="/login">Login</Link> to continue
    </>
  }
  return (
    <>
      <button className="btn black" onClick={() => { addItemToCart(productID) }}>Add to Cart</button>
      {error && <div>Couldn't add product to cart</div>}
    </>
  );
};


export default AddToCart;