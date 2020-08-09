import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { Link, withRouter } from 'react-router-dom';
import { Popover, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var r = {
    name: /[A-Za-z0-9]{4,20}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /[A-Za-z0-9]{6,16}$/,
    bandcampLink: /[A-Za-z0-9]{6,20}$|^$/,
    spotifyLink: /[A-Za-z0-9]{22}$|^$/,
    facebookLink: /[A-Za-z0-9]{6,20}$|^$/,
    twitterLink: /[A-Za-z0-9]{6,20}$|^$/,
}

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

        let exitFlag = false;
        for (let prop in newUser) {
            if (!r[prop].test(newUser[prop])) {
                this.setState({
                    [prop + 'PopoverOpen']: true
                });
                exitFlag = true;
            }
        }
        if (exitFlag) {
            return;
        }
        
        // Attempt to register user
        this.props.register(newUser);
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

    onPopoverToggle = e => {
        this.setState({
            [e.target.name + 'PopoverOpen']: false
        });
    }

    render() {
        const user_exists = this.state.msg === "User already exists";
        return(
            <div className="login-bg">
                
                <form action="index.html" className="register-form">
                    <div className="logo-login mb-5"><img className="logo-login-img" src="/logo.png" alt="logo"></img></div>

                    <div>
                        <div className="txtb" id="name">
                            <input type="text" autoComplete="off" name="name" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                            <span data-placeholder="Name"></span>
                        </div>
                        <Popover placement="right" isOpen={ this.state.namePopoverOpen } target="name" toggle={this.onPopoverToggle}>
                            <PopoverBody className="text-white">
                                Name should contain 4-20 alphanumerical characters. <br />
                            </PopoverBody>
                        </Popover>
                    </div>
                    

                    <div>
                        <div className="txtb" id="email">
                            <input type="text" autoComplete="off" name="email" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                            <span data-placeholder="E-Mail"></span>
                        </div>
                        <Popover placement="right" isOpen={ this.state.emailPopoverOpen } target="email" toggle={this.onPopoverToggle}>
                                <PopoverBody className="text-white">
                                    This e-mail is not valid.<br />
                                    <i>Example: name@domain.com</i>
                                </PopoverBody>
                        </Popover>
                    </div>
                    
                    

                    <div>
                        <div className="txtb" id="password">
                            <input type="password" name="password" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur}  />
                            <span data-placeholder="Password"></span>
                        </div>
                        <Popover placement="right" isOpen={ this.state.passwordPopoverOpen } target="password" toggle={this.onPopoverToggle}>
                                <PopoverBody className="text-white">
                                    This password is not valid. It must contain 6-16 alphanumerical characters.
                                </PopoverBody>
                        </Popover>
                    </div>

                    
                    <div>
                        <div className="txtb" id="bandcampLink">
                            <input type="text" autoComplete="off" name="bandcampLink" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                            <span data-placeholder="Bandcamp (optional)"></span>
                        </div>
                        <Popover placement="right" isOpen={ this.state.bandcampLinkPopoverOpen } target="bandcampLink" toggle={this.onPopoverToggle}>
                            <PopoverBody className="text-white">
                                For "http://artist.bandcamp.com" enter "artist".
                            </PopoverBody>
                        </Popover>
                    </div>
                    
                    <div>
                        <div className="txtb" id="spotifyLink">
                            <input type="text" autoComplete="off" name="spotifyLink" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                            <span data-placeholder="Spotify URI (optional)"></span>
                        </div>
                        <Popover placement="right" isOpen={ this.state.spotifyLinkPopoverOpen } target="spotifyLink" toggle={this.onPopoverToggle}>
                            <PopoverBody className="text-white">
                                Enter your 22-character Spotify URI.<br />
                                <i>Example: <br />spotify:artist:<u>4rohfx5aI2ISAXUkFXPy9R</u></i>
                            </PopoverBody>
                        </Popover>
                    </div>
                    
                    <div>
                        <div className="txtb" id="facebookLink">
                            <input type="text" autoComplete="off" name="facebookLink" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                            <span data-placeholder="Facebook (optional)"></span>
                        </div>
                        <Popover placement="right" isOpen={ this.state.facebookLinkPopoverOpen } target="facebookLink" toggle={this.onPopoverToggle}>
                            <PopoverBody className="text-white">
                                For "http://facebook.com/artist" enter "artist".
                            </PopoverBody>
                        </Popover>
                    </div>

                    <div>
                        <div className="txtb" id="twitterLink">
                            <input type="text" autoComplete="off" name="twitterLink" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                            <span data-placeholder="Twitter (optional)"></span>
                        </div>
                        <Popover placement="right" isOpen={ this.state.twitterLinkPopoverOpen } target="twitterLink" toggle={this.onPopoverToggle}>
                            <PopoverBody className="text-white">
                                For "http://twitter.com/artist" enter "artist".
                            </PopoverBody>
                        </Popover>
                    </div>
                    

                    <button className="logbtn" onClick={this.onSubmit}>Sign up</button>
                    {user_exists ? 
                        <div className="incorrect-login-text animate-fadein">
                            <FontAwesomeIcon size="sm" icon="exclamation-triangle" className="mr-1" />
                            User already exists.
                        </div>
                    :
                        null
                    }

                    <div className="bottom-text">
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