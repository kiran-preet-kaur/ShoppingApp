import { connect } from 'react-redux';
import Orders from './Orders'

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
  user: state.login.user
})


export default connect(mapStateToProps, [])(Orders);