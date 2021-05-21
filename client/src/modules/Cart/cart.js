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
    const { cartItems, loader, removeCartItem } = this.props;
    if (loader) {
      return <Loader />
    } else if (cartItems.length < 1) {
      return <div>You have no products in your cart.
        Go to <Link to='/listing'>Products</Link> to add.
      </div>
    }
    return (
      <div>
        <h1 className="center" style={{ fontSize: '40px', marginTop: 0 }}>Shopping Bag</h1>
        {cartItems.map(cartItem => <CartItem key={cartItem._id} data={cartItem} removeCartItem={removeCartItem} />)}
      </div>
    );
  }
}

export default Cart