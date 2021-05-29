import { connect } from 'react-redux';
import { getUser, logoutUser } from '../Login/actionLogin';
import Navbar from './Navbar';

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
  user: state.login.user
})

const mapDispatchToProps = {
  getUser,
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);