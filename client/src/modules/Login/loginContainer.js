import { connect } from 'react-redux';
import { getLogin, getUser, registerUser } from './actionLogin';
import Login from './Login'

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
  user: state.login.user
})

const mapDispatchToProps = {
  getLogin,
  getUser,
  registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);