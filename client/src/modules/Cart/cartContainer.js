import { connect } from 'react-redux';
import { addItemToCart, getCartItems, removeCartItem, updateCartItem } from './actionCart';
import Cart from './cart'

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.cart.error,
  user: state.login.user,
  cartItems: state.cart.cartItems,
  loader: state.cart.loader
})

const mapDispatchToProps = {
  addItemToCart,
  removeCartItem,
  getCartItems,
  updateCartItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);