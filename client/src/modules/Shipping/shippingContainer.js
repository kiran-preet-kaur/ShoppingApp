import { connect } from 'react-redux';
import shipping from './shipping';
import { getAddress, addAddress, deleteAddress, updateAddress, changeSelectedAddress } from './actionShipping';
import { emptyCart } from '../Cart/actionCart';

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
  user: state.login.user,
  addresses: state.shipping.addresses,
  selectedAddress: state.shipping.selectedAddress,
  loading: state.shipping.loading,
  cartItems: state.cart.cartItems,
  totalPrice: state.cart.totalPrice,
})
const mapDispatchToProps = {
  getAddress, addAddress, deleteAddress, updateAddress, changeSelectedAddress, emptyCart
}

export default connect(mapStateToProps, mapDispatchToProps)(shipping);