import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    // constructor(...args) {
    //     super(...args);
    // }

    componentDidMount() {
        if (localStorage.getItem('token') && !this.props.user) {
            this.props.getUser();
        }
    }

    render() {
        //const { } = this.props;
        return (
            <>
                <nav className="black">
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo center">ArtsyStore</Link>
                        <div data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></div>
                        <Link to="/profile" className="right"><i className="material-icons left" >account_circle</i></Link>
                        <Link to="/cart" className="right"><i className="material-icons left" >shopping_cart</i></Link>
                    </div>
                </nav>

                <div className="sidenav" id="slide-out">
                    <div className="card-panel" style={{ marginTop: 0 }}>Menu<i className="material-icons right sidenav-close">close</i></div>
                    <ul>
                        <li>

                            <ul className="collapsible"><li className="active">
                                <div className="collapsible-header">Collection<i className="tiny material-icons right" style={{ marginRight: 0 }}>arrow_drop_down</i></div>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><Link to="/listing/" className="sidenav-close">View All</Link></li>
                                        <li><Link to="/listing/Rings" className="sidenav-close">Rings</Link></li>
                                        <li><Link to="/listing/Decor" className="sidenav-close">Decor</Link></li>
                                    </ul>
                                </div>
                            </li></ul>
                        </li>
                        <li>{!localStorage.getItem('token') ? <Link to="/login" className="sidenav-close"><i className="tiny material-icons" style={{ marginRight: 0 }}>person_add</i>Login</Link> : <a onClick={this.props.logoutUser} className="sidenav-close">Logout</a>}</li>
                        <li><Link to="/orders" className="sidenav-close">Your orders</Link></li>
                        <li><Link to="/return-policy" className="sidenav-close">Return policy</Link></li>
                        <li><Link to="/contact-us" className="sidenav-close">Contact Us</Link></li>
                    </ul>
                </div>
            </>
        );
    }
}


export default Navbar;