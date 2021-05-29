import React, { Component } from 'react';
import Loader from '../../layouts/Loader';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor() {
    super();
  }

  componentDidMount() {

    this.props.getCartItems();
  }

  render() {
    const { cartItems, loader, removeCartItem, error, totalPrice } = this.props;
    if (cartItems.length < 1 || error) {
      return <div>You have no products in your cart.
        Go to <Link to='/listing'>Products</Link> to add.
      </div>
    } else if (loader) {
      return <Loader />
    } else
      return (
        <div>
          <h1 className="center" style={{ fontSize: '40px', marginTop: 0 }}>Shopping Bag</h1>
          {cartItems.map(cartItem => <CartItem key={cartItem._id} data={cartItem} removeCartItem={removeCartItem} />)}
          <div className="center"><h6>Total amount</h6>
            <h6>₹ {totalPrice}</h6>
            <Link to="/shipping"><button className="btn black" style={{ marginTop: "20px" }}>Place Order</button></Link>
          </div>
        </div>
      );
  }
}

export default Cart