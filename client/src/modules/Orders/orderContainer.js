import { connect } from 'react-redux';
import Orders from './Orders';
import { getOrders } from './actionOrder';

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
  user: state.login.user,
  orders: state.orders.orders
})

const mapDispatchToProps = {
  getOrders
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);