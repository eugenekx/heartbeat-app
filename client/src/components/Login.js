import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { login } from '../actions/authActions';
import { Link } from 'react-router-dom';

import { clearErrors } from '../actions/errorActions';

class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: null
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
            this.props.history.push("/review");
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

        // Attempt to login user
        this.props.login(user);
    };

    onReview = e => {
        this.props.history.push("/review");
    }

    render() {
        return(
            <div className="formContainer">
                <h1>Log in</h1>
                { this.state.msg ? <Alert color="danger"> { this.state.msg } </Alert> : null }
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="email">
                            E-mail
                        </Label>
                        <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="E-mail"
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">
                            Password
                        </Label>
                        <Input 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="Password"
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <Button className="btn-primary" block>Log in</Button>
                    
                    
                </Form>
                <div className="mt-5 align-items-center"><Link to="/register/">Register</Link></div>
                
            </div>  
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(Login);