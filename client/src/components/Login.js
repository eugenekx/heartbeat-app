import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { clearErrors } from '../actions/errorActions';

class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: null,
        redirectToReferrer: false,
        loading: false
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // if authenticated, redirect
        if (isAuthenticated) {
            this.setState(() => ({
                redirectToReferrer: true
              }))
        }
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        
        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        this.setState({loading: true});
        // Attempt to login user
        this.props.login(user);
    };

    onReview = e => {
        this.props.history.push("/review");
    }

    onFocus = e => {
        e.target.classList.add("focus");
        console.log(e.target);
    }

    onBlur = e => {
        if (e.target.value === '')
            e.target.classList.remove("focus");
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/review' } }
        const { redirectToReferrer } = this.state
        if (redirectToReferrer === true) {
            return <Redirect to={from} />  
        }
        return(
            <div className="login-bg">
                <form action="index.html" class="login-form">
                    <div className="logo-login mb-5"><img className="logo-login-img" src="/logo.png" alt="logo"></img></div>
                    <h1 className="d-none">Sign In</h1>

                    <div class="txtb">
                        <input type="text" autocomplete="off" name="email" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                        <span data-placeholder="E-Mail"></span>
                    </div>

                    <div class="txtb">
                        <input type="password" name="password" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur}  />
                        <span data-placeholder="Password"></span>
                    </div>

                    <button class="logbtn" onClick={this.onSubmit}>{this.state.loading ? 'Loading...' : 'Sign in'}</button>

                    <div class="bottom-text">
                        Don't have account? <Link to="register">Sign up</Link>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(withRouter(Login));