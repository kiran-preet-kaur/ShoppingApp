import { connect } from 'react-redux';
import { getProducts } from './actionListing';
import Listing from './Listing'

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  error: state.listing.error,
  user: state.login.user,
  products: state.listing.products
})

const mapDispatchToProps = {
  getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing);