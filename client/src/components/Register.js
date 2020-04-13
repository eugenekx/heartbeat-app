import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { register } from '../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clearErrors } from '../actions/errorActions';
import axios from 'axios';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        bandcampLink: '',
        spotifyLink: '',
        facebookLink: '',
        twitterLink: '',
        selectedAvatarFile: null,
        avatar: null,
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    onChangeAvatar = (e) => {
        console.log(e.target.files[0]);

        this.setState({
            selectedAvatarFile: e.target.files[0]
        })

        const avatarData = new FormData();
        avatarData.append('avatar', e.target.files[0]);
        axios.post('/upload/avatar', avatarData, { 
            // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
            this.setState({avatar: res.data});
        })
    }

    onAvatarClick = (e) => {
        this.avatarInput.click();
    }

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
        
        const { name, avatar, email, password, bandcampLink, spotifyLink, facebookLink, twitterLink } = this.state;

        // Create user object
        const newUser = {
            name,
            avatar,
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

    render() {
        return(
            <div className="formContainer">
                <h1>Register</h1>
                { this.state.msg ? <Alert color="danger"> { this.state.msg } </Alert> : null }
                
                <div className="select-avatar-wrapper">
                    <img src={this.state.avatar ? `/songdata/${this.state.avatar}` : "/userpic.png"} alt="avatar" className="profile-avatar" />
                    <div className="select-avatar-button" onClick={this.onAvatarClick}>
                        <FontAwesomeIcon fixedWidth icon="camera" size="lg" className="fa-icon" />
	                </div>
                    <input ref={(input) => { this.avatarInput = input; }} className="select-avatar-upload" type="file" accept="image/*" onChange={this.onChangeAvatar} />
                </div>
                
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

                    <FormGroup>
                        <Label for="bandcamp">
                            Bandcamp Link
                        </Label>
                        <Input 
                            id="bandcamp" 
                            name="bandcamp" 
                            type="url" 
                            placeholder="Bandcamp Link (optional)"
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="spotify">
                            Spotify Link
                        </Label>
                        <Input 
                            id="spotify" 
                            name="spotify" 
                            type="url" 
                            placeholder="Spotify Link (optional)"
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="facebook">
                            Facebook Link
                        </Label>
                        <Input 
                            id="facebook" 
                            name="facebook" 
                            type="url" 
                            placeholder="Facebook Link (optional)"
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="twitter">
                            Twitter Link
                        </Label>
                        <Input 
                            id="twitter" 
                            name="twitter" 
                            type="url" 
                            placeholder="Twitter Link (optional)"
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