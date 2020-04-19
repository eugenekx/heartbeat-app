import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { register } from '../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clearErrors } from '../actions/errorActions';
import axios from 'axios';

import { Link, Redirect, withRouter } from 'react-router-dom';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        bandcampLink: '',
        spotifyLink: '',
        facebookLink: '',
        twitterLink: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };


    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // if authenticated, redirect
        if (isAuthenticated) {
            this.props.history.push("/review");
        }
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        
        const { name, email, password, bandcampLink, spotifyLink, facebookLink, twitterLink } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password,
            bandcampLink,
            spotifyLink,
            facebookLink,
            twitterLink
        };
        
        // Attempt to register user
        this.props.register(newUser);
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
        return(
            <div className="login-bg">
                
                <form action="index.html" class="register-form">
                    <div className="logo-login mb-5"><img className="logo-login-img" src="/logo.png" alt="logo"></img></div>

                    <div class="txtb">
                        <input type="text" autocomplete="off" name="name" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                        <span data-placeholder="Name"></span>
                    </div>

                    <div class="txtb">
                        <input type="text" autocomplete="off" name="email" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                        <span data-placeholder="E-Mail"></span>
                    </div>

                    <div class="txtb">
                        <input type="password" name="password" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur}  />
                        <span data-placeholder="Password"></span>
                    </div>

                    <div class="txtb">
                        <input type="text" autocomplete="off" name="bandcamp" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                        <span data-placeholder="Bandcamp (optional)"></span>
                    </div>

                    <div class="txtb">
                        <input type="text" autocomplete="off" name="spotify" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                        <span data-placeholder="Spotify (optional)"></span>
                    </div>

                    <div class="txtb">
                        <input type="text" autocomplete="off" name="facebook" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                        <span data-placeholder="Facebook (optional)"></span>
                    </div>

                    <div class="txtb">
                        <input type="text" autocomplete="off" name="twitter" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                        <span data-placeholder="Twitter (optional)"></span>
                    </div>

                    <button class="logbtn" onClick={this.onSubmit}>Sign up</button>

                    <div class="bottom-text">
                        Already a member? <Link to="login">Sign in</Link>
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
    { register, clearErrors }
)(withRouter(Register));