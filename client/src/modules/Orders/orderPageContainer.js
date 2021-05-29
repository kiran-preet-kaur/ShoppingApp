import { connect } from 'react-redux';
import Order from './Order';
import { getOrder } from './actionOrder';

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
  user: state.login.user,
  order: state.orders.order
})

const mapDispatchToProps = {
  getOrder
}


export default connect(mapStateToProps, mapDispatchToProps)(Order);