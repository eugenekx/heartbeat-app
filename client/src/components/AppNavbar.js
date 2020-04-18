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
                        
                            <Form>
                                <FormGroup>
                                    <Label for="name">
                                        Name
                                    </Label>
                                    <Input id="name" type="text" className="text-field" value={user ? user.name : null}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email">
                                        E-Mail
                                    </Label>
                                    <Input id="email" type="email" className="text-field" value={user ? user.email : null} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="bandcamp">
                                        Bandcamp Link
                                    </Label>
                                    <Input 
                                        id="bandcamp" 
                                        name="bandcamp" 
                                        className="text-field"
                                        type="url" 
                                        placeholder="Bandcamp Link (optional)"
                                        value={user ? user.bandcampLink : null}
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
                                        className="text-field"
                                        type="url" 
                                        placeholder="Spotify Link (optional)"
                                        value={user ? user.spotifyLink : null}
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
                                        className="text-field" 
                                        type="url" 
                                        placeholder="Facebook Link (optional)"
                                        value={user ? user.facebookLink : null}
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
                                        className="text-field mb-0"
                                        type="url" 
                                        placeholder="Twitter Link (optional)"
                                        value={user ? user.twitterLink : null}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                            </Form>     
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