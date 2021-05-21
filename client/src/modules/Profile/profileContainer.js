import { connect } from 'react-redux';
import Profile from './Profile'

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
  user: state.login.user
})


export default connect(mapStateToProps, [])(Profile);