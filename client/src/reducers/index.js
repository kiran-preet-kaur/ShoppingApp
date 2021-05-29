import { combineReducers } from 'redux';
import loginReducer from '../modules/Login/loginReducer';
import listingReducer from '../modules/Listing/listingReducer';
import cartReducer from '../modules/Cart/cartReducer';
import shippingReducer from '../modules/Shipping/shippingReducer';
import orderReducer from '../modules/Orders/orderReducer';

export default combineReducers({
  login: loginReducer,
  listing: listingReducer,
  cart: cartReducer,
  shipping: shippingReducer,
  orders: orderReducer
});