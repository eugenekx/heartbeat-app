import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { register } from '../actions/authActions';

import { clearErrors } from '../actions/errorActions';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
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
        
        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password
        };
        
        // Attempt to register user
        this.props.register(newUser);
    };

    onReview = e => {
        this.props.history.push("/review");
    }

    render() {
        return(
            <div className="formContainer">
                <h1>Register</h1>
                { this.state.msg ? <Alert color="danger"> { this.state.msg } </Alert> : null }
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="name">
                            Name
                        </Label>
                        <Input 
                            id="name" 
                            name="name" 
                            type="text" 
                            placeholder="Name"
                            onChange={this.onChange}
                        />
                    </FormGroup>

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

                    <Button className="btn-primary" block>Register</Button>
                    
                </Form>

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
    { register, clearErrors }
)(Register);