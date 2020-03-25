import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Menu extends Component {
    static propTypes = {
        logoutUser: PropTypes.func.isRequired
    };
    
    click = (e) => {
        this.props.logoutUser();
        this.props.history.push("/login");
    }

    render () {
        return (
            <Nav vertical id="sidebar">
                
                <div className="logo"><img src="/logo.png" alt="logo"></img></div>

                <div activeMarker className="activeMarker"></div>

                <div className="catText">Main</div>
                <NavItem>
                    <NavLink href="#" className="sidebarItem sidebarActive">
                        <FontAwesomeIcon fixedWidth icon="heartbeat" size="lg" className="sidebarIcon" />
                        Review
                    </NavLink>
                </NavItem>
                
                <NavItem>
                    
                    <NavLink href="#" className="sidebarItem">
                        <FontAwesomeIcon fixedWidth icon="user" size="lg" className="sidebarIcon" />
                        Profile
                    </NavLink>
                </NavItem>

                <NavItem>
                    
                    <NavLink href="#" className="sidebarItem" onClick={this.click}>
                        <FontAwesomeIcon fixedWidth icon="sign-out-alt" size="lg" className="sidebarIcon" />
                        Logout
                    </NavLink>
                </NavItem>

                <div className="catText">Your Submissions</div>

                <NavItem>
                    
                    <NavLink href="#" className="sidebarItem">
                        <FontAwesomeIcon fixedWidth icon="music" size="lg" className="sidebarIcon" />
                        Your Music
                    </NavLink>
                </NavItem>

                <div className="catText">Your Reviews</div>
                <NavItem>
                    
                    <NavLink href="#" className="sidebarItem">
                        <FontAwesomeIcon fixedWidth icon="star" size="lg" className="sidebarIcon" />
                        Favorite
                    </NavLink>
                </NavItem>


                <NavItem>
                    
                    <NavLink href="#" className="sidebarItem">
                        <FontAwesomeIcon fixedWidth icon="history" size="lg" className="sidebarIcon" />
                        History
                    </NavLink>
                </NavItem>
            </Nav>
        );
    }
}

export default withRouter(connect(null, { logoutUser })(Menu));