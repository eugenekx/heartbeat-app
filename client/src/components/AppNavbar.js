import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Navbar, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

class AppNavbar extends Component {
    state = {
        modal: false,
        selectedAvatarFile: null,
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

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const profileModal = (
            <Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle}> 
                        <ModalHeader>
                            Profile
                        </ModalHeader>  

                        <ModalBody>
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
                                    <Input id="name" type="text" value={user ? user.name : null}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email">
                                        E-Mail
                                    </Label>
                                    <Input id="email" type="email"  value={user ? user.email : null} />
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
                                        type="url" 
                                        placeholder="Twitter Link (optional)"
                                        value={user ? user.twitterLink : null}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                            </Form>     
                        </ModalBody>  

                        <button onClick={this.logout}>Log Out</button>
                        
                        <ModalFooter>
                        <button className="btn btn-primary" onClick={this.onSubmitTrack}>Submit</button>       
                        <button className="btn btn-secondary" onClick={this.toggle}>Close</button>
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
                    <BreadcrumbItem className="myBreadcrumbItem"><a href="#">REVIEW</a></BreadcrumbItem>
                    <BreadcrumbItem className="myBreadcrumbItem" active>ELECTRONICA / DOWNTEMPO</BreadcrumbItem>
                </Breadcrumb>

                <div className="ml-auto">
                    <span className="username mr-4">Points: {user ? user.points : '-'}</span>
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