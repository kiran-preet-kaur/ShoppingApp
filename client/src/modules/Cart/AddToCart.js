import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const AddToCart = props => {
  const { productID, addItemToCart } = props;
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, [visible]);

  const handleClick = () => {
    if (localStorage.getItem('token')) {
      addItemToCart(productID).then(res => setVisible(true)).catch(err => { setError(err) });
    } else {
      setShowError(true);
    }

  }

  return (
    <>
      <button className="btn black" style={{ marginTop: "5px", marginBottom: "5px" }} onClick={handleClick}>Add to Cart</button>
      {error && <div>Couldn't add product to cart. {error}</div>}
      {showError && <div>You are not logged in. <Link to="/login">Login</Link> to continue</div>}
      {visible && <div>Item added to Cart!</div>}
    </>
  );
};


export default AddToCart;