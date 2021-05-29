import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const AddToCart = props => {
  const { productID, addItemToCart, error, message } = props;
  const { showError, setShowError } = useState(null);
  const handleClick = () => {
    if (localStorage.getItem('token')) {
      addItemToCart(productID);
    } else {
      setShowError(true);
    }

  }
  return (
    <>
      <button className="btn black" style={{ marginTop: "5px", marginBottom: "5px" }} onClick={handleClick}>Add to Cart</button>
      {error && <div>Couldn't add product to cart</div>}
      {showError && <div>You are not logged in. <Link to="/login">Login</Link> to continue</div>}
      {message && <div>Item added to Cart!</div>}
    </>
  );
};


export default AddToCart;