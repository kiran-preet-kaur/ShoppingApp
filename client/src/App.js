import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css';

import Home from './modules/Home/Home';
import Listing from './modules/Listing/listingContainer';
import Product from './modules/Product/Product';
import Navbar from './modules/Header/Navbar';
import Login from './modules/Login/loginContainer';
import Profile from './modules/Profile/profileContainer';
import Orders from './modules/Orders/orderContainer';
import Cart from './modules/Cart/cartContainer';

import { Provider } from 'react-redux';
import store from './store';
import Footer from './layouts/Footer';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  })
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar instance={M} />
          <div className='container' style={{ paddingTop: '25px' }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/listing/:category' component={Listing} />
              <Route exact path='/listing/' component={Listing} />
              <Route path='/product/:id' component={Product} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/orders' component={Orders} />
              <Route exact path='/cart' component={Cart} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
