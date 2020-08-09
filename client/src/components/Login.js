import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { clearErrors } from '../actions/errorActions';

import { Popover, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: null,
        redirectToReferrer: false,
        emailPopoverOpen: false,
        passPopoverOpen: false,
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
                this.setState({ msg: error.id, loading: false, password: '' });
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

        var rEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        var rPass = /[A-Za-z0-9]{6,16}$/;

        if (!rEmail.test(email)) {
            this.setState({
                emailPopoverOpen: true
            });
            return;
        }

        if (!rPass.test(password)) {
            this.setState({
                passPopoverOpen: true
            });
            return;
        }

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
    }

    onBlur = e => {
        if (e.target.value === '')
            e.target.classList.remove("focus");
    }

    onEmailPopoverToggle = e => {
        this.setState({
            emailPopoverOpen: false
        });
    }

    onPassPopoverToggle = e => {
        this.setState({
            passPopoverOpen: false
        });
    }


    render() {
        const { from } = this.props.location.state || { from: { pathname: '/review' } };
        const { redirectToReferrer, emailPopoverOpen, passPopoverOpen } = this.state;
        const is_failed = this.state.msg === 'LOGIN_FAIL';
        if (redirectToReferrer === true) {
            return <Redirect to={from} />  
        }
        return(
            <div className="login-bg">
                <form action="index.html" className="login-form">
                    <div className="logo-login mb-5"><img className="logo-login-img" src="/logo.png" alt="logo"></img></div>
                    <h1 className="d-none">Sign In</h1>
                    <div>
                        <div className="txtb" id="email_field">
                            <input type="text" autoComplete="off" name="email" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                            <span data-placeholder="E-Mail"></span>
                        </div>
                        <Popover placement="right" isOpen={emailPopoverOpen} target="email_field" toggle={this.onEmailPopoverToggle}>
                            <PopoverBody className="text-white">
                                This e-mail is not valid.<br />
                                <i>Example: name@domain.com</i>
                            </PopoverBody>
                        </Popover>
                    </div>
                    
                    <div>
                        <div className="txtb" id="pass_field">
                            <input type="password" name="password" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} value={this.state.password} />
                            <span data-placeholder="Password"></span>
                        </div>
                        <Popover placement="right" isOpen={passPopoverOpen} target="pass_field" toggle={this.onPassPopoverToggle}>
                                <PopoverBody className="text-white">
                                    This password is not valid. It must contain 6-16 alphanumerical characters.
                                </PopoverBody>
                        </Popover>
                    </div>

                    <button className="logbtn" onClick={this.onSubmit}>{this.state.loading ? 'Loading...' : 'Sign in'}</button>
                    {is_failed ? 
                        <div className="incorrect-login-text animate-fadein">
                            <FontAwesomeIcon size="sm" icon="exclamation-triangle" className="mr-1" />
                            Incorrect e-mail or password.
                        </div>
                    :
                        null
                    }
                    <div className="bottom-text">
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