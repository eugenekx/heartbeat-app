import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Navbar, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AppNavbar extends Component {
    state = {
        modal: false,
        selectedAvatarFile: null,
        breadcrumbs: [],
        link: ''
    }

    toggle = () => { this.setState({ modal: !this.state.modal }); }

    logout = (e) => {
        this.props.logoutUser();
        this.props.history.push("/login");
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logoutUser: PropTypes.func.isRequired
    }

    onChangeAvatar = (e) => {
        console.log(e.target.files[0]);

        this.setState({
            selectedAvatarFile: e.target.files[0]
        })
    }

    onAvatarClick = (e) => {
        this.avatarInput.click();
    }

    updateBreadcrumbs = () => {
        const { breadcrumbs } = this.state; 
        switch (this.props.location.pathname) {
            case '/review':
                if (this.props.location.search) {
                    const genre = queryString.parse(this.props.location.search).genre;
                    axios
                        .get(`/api/genres/${genre}`, this.getToken())
                        .then(res => { this.setState({ 
                            breadcrumbs: ['REVIEW', res.data.text.toUpperCase()],
                            link: '/review'
                        }); 
                    });
                } else {
                    this.setState({
                        breadcrumbs: ['','']
                    });
                }
                break;
            case '/your_music/song':
                if (this.props.location.search) {
                    const id = queryString.parse(this.props.location.search).id;
                    axios
                        .get(`/api/songs/id/${id}`, this.getToken())
                        .then(res => { this.setState({ 
                            breadcrumbs: ['YOUR MUSIC', res.data.name.toUpperCase()],
                            link: '/your_music' 
                        }); 
                    });
                } else {
                    this.setState({
                        breadcrumbs: ['', '']
                    });
                }
                break;
            case '/history/review':
                
                if (this.props.location.search) {
                    console.log('hey');
                    const id = queryString.parse(this.props.location.search).id;
                    axios
                        .get(`/api/reviews/id/${id}`, this.getToken())
                        .then(res => { this.setState({ 
                            breadcrumbs: ['HISTORY', res.data.song.name.toUpperCase()],
                            link: '/history'
                        }); 
                    });
                } else {
                    this.setState({
                        breadcrumbs: ['', '']
                    });
                }
                break;
            default:
                this.setState({
                    breadcrumbs: ['','']
                });
                break;
        }
        console.log(breadcrumbs);
    }

    onFocus = e => {
        e.target.classList.add("focus");
        console.log(e.target);
    }

    onBlur = e => {
        if (e.target.value === '')
            e.target.classList.remove("focus");
    }

    getToken = () => {
        // Get token from local storage
        const token = this.props.auth.token;

        // Headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        // If token, add to headers
        if(token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
    }

    componentDidMount() {
        this.updateBreadcrumbs();
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.location.key != this.props.location.key) {
            this.updateBreadcrumbs();
        }
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const profileModal = (
            <Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle}> 
                        <ModalBody className="mt-5">
                            <div className="select-avatar-wrapper">
                                <img src={user.avatar ? `/songdata/${user.avatar}` : "userpic.png"} alt="avatar" className="profile-avatar" />
                                <div className="select-avatar-button" onClick={this.onAvatarClick}>
                                    <FontAwesomeIcon fixedWidth icon="camera" size="lg" className="fa-icon" />
	                            </div>
                                <input ref={(input) => { this.avatarInput = input; }} className="select-avatar-upload" type="file" accept="image/*" onChange={this.onChangeAvatar} />
                            </div>
                        
                            <form action="index.html" class="user-form">
                                <div className="txtb">
                                    <input className="focus" type="text" value={user.name || null} autocomplete="off" name="name" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                                    <span data-placeholder="Name"></span>
                                </div>

                                <div class="txtb">
                                    <input className="focus" type="text" value={user.email || null} autocomplete="off" name="email" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                                    <span data-placeholder="E-Mail"></span>
                                </div>


                                <div class="txtb">
                                    <input className={user.bandcampLink ? "focus" : null } type="text" value={user.bandcampLink || null} autocomplete="off" name="bandcamp" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                                    <span data-placeholder="Bandcamp (optional)"></span>
                                </div>

                                <div class="txtb">
                                    <input className={user.spotifyLink ? "focus" : null } type="text" value={user.spotifyLink || null} autocomplete="off" name="spotify" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                                    <span data-placeholder="Spotify (optional)"></span>
                                </div>

                                <div class="txtb">
                                    <input className={user.facebookLink ? "focus" : null } type="text" value={user.facebookLink || null} autocomplete="off" name="facebook" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                                    <span data-placeholder="Facebook (optional)"></span>
                                </div>

                                <div class="txtb">
                                    <input className={user.twitterLink ? "focus" : null } type="text" value={user.twitterLink || null} autocomplete="off" name="twitter" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
                                    <span data-placeholder="Twitter (optional)"></span>
                                </div>
                            </form>  
                        </ModalBody>  

                        
                        
                        <ModalFooter>
                        <div className="logout-label clickable mr-auto" onClick={this.logout}>
                            <FontAwesomeIcon icon='sign-out-alt' className="mr-2" />
                            Log Out
                        </div>
                        <button className="btn btn-danger" onClick={this.onSubmitTrack}>UPDATE</button>       
                        <button className="btn btn-secondary" onClick={this.toggle}>CLOSE</button>
                        </ModalFooter>      
                    </Modal>
            </Fragment>
        ) 
        
        const userPanel = (
            <Fragment>
                <button onClick={this.toggle} className="ml-4 d-none d-md-inline">
                        <img src={user.avatar ? `/songdata/${user.avatar}` : "userpic.png"} alt="avatar" className="avatar" />
                        <div className="username d-inline-block ml-2">
                            { user ? user.name : null }
                        </div>
                </button>
            </Fragment>
        )

        return(
            <Navbar className="mb-5" id="appNavbar">
                <Breadcrumb listClassName="myBreadcrumb" className="d-none d-md-block">
                    {this.state.breadcrumbs[0] ? <BreadcrumbItem className="myBreadcrumbItem"><Link to={this.state.link}>{this.state.breadcrumbs[0]}</Link></BreadcrumbItem> : null}
                    {this.state.breadcrumbs[1] ? <BreadcrumbItem className="myBreadcrumbItem" active>{this.state.breadcrumbs[1]}</BreadcrumbItem> : null}
                </Breadcrumb>

                <div className="ml-auto">
                    <span className="user-points mr-4">
                        {user.name ? user.points : '-'}
                        <FontAwesomeIcon icon="headphones" className="ml-2"/>
                    </span>
                    <a href="#" className="notificationLink">
                        <FontAwesomeIcon icon="bell" size="lg" />
                    </a>

                    
                </div>    
                
                { isAuthenticated ? userPanel : null}
                { isAuthenticated ? profileModal : null}
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logoutUser })(AppNavbar));