import { combineReducers } from 'redux';
import loginReducer from '../modules/Login/loginReducer';
import listingReducer from '../modules/Listing/listingReducer';
import cartReducer from '../modules/Cart/cartReducer';

export default combineReducers({
  login: loginReducer,
  listing: listingReducer,
  cart: cartReducer
});