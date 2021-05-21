import React, { Component } from 'react';
import Loader from '../../layouts/Loader';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            screen: 'Login',
            loading: false,
            email: '',
            password: '',
            password2: '',
            name: '',
            phone: '',
            err: null
        }
    }

    handleLogin = () => {
        this.setState({
            loading: true
        });
        this.props.getLogin(this.state.email, this.state.password);


    }

    handleRegister = () => {
        this.setState({
            loading: true
        });

        if (this.state.password === this.state.password2) {
            this.props.registerUser(this.state.name, this.state.email, this.state.password, this.state.phone);
        } else {
            this.setState({
                err: 'Passwords do not match'
            })
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    LoginForm = () => {
        return (
            <>
                <h4 className="center">Login Form</h4>
                <div className="row">
                    <form className="col s12" onSubmit={this.handleLogin}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate" onChange={this.handleEmailChange} />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
                                <label htmlFor="password">Password</label>
                                {this.props.error && <span class="helper-text" data-error="wrong">{this.props.error}</span>}
                            </div>
                        </div>

                        <button className="btn grey darken-4" type="submit"> Submit </button>

                    </form>
                </div>
                <div>Don't have an account? <span onClick={this.showRegisterForm}>Register</span></div>
            </>
        )
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handlePassword2Change = (event) => {
        this.setState({
            password2: event.target.value
        })
    }

    handlePhoneChange = (event) => {
        this.setState({
            phone: event.target.value
        })
    }

    showRegisterForm = () => {
        this.setState({
            screen: 'Register'
        });
    }

    RegisterForm = () => {
        return (
            <>
                <h4 className="center">Register Form</h4>
                <div className="row">
                    <form className="col s12" onSubmit={this.handleRegister}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" className="validate" onChange={this.handleNameChange} />
                                <label htmlFor="name">Name*</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="phone" type="text" className="validate" onChange={this.handlePhoneChange} />
                                <label htmlFor="phone">Phone</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate" onChange={this.handleEmailChange} />
                                <label htmlFor="email">Email*</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
                                <label htmlFor="password">Password*</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password2" type="password" className="validate" onChange={this.handlePassword2Change} />
                                <label htmlFor="password2">Re-enter Password*</label>
                                {this.state.err && <span class="helper-text" data-error="wrong">{this.state.err}</span>}
                                {this.props.error && <span class="helper-text" data-error="wrong">{this.props.error}</span>}
                            </div>
                        </div>

                        <button className="btn grey darken-4" type="submit" >Submit </button>

                    </form>
                </div>
            </>
        )
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                loading: true
            })
            this.props.getUser();
        }
    }


    render() {
        //const { } = this.props;

        if (this.props.isAuthenticated && this.props.user) {
            return <Redirect to='/profile' />
        }
        else if (this.state.loading && !this.props.error) {
            return <Loader />
        } else {
            return (
                this.state.screen === 'Login' ? this.LoginForm() : this.RegisterForm()
            );
        }
    }
}


export default Login;