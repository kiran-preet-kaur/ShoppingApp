import { connect } from 'react-redux';
import { addItemToCart } from './actionCart';
import AddToCart from './AddToCart'

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.cart.error,
  message: state.cart.message,
  user: state.login.user
})

const mapDispatchToProps = {
  addItemToCart,

}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);