import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Menu extends Component {
    render () {
        return (
            <Nav vertical id="sidebar">
                
                <div className="logo"><img src="/logo.png" alt="logo"></img></div>

                <div className="catText">Main</div>
                <NavItem>
                    
                    <NavLink href="#" className="sidebarItem">
                        <FontAwesomeIcon fixedWidth icon="home" size="lg" className="sidebarIcon" />
                        Home
                    </NavLink>
                </NavItem>
                
                <NavItem>
                    
                    <NavLink href="#" className="sidebarItem">
                        <FontAwesomeIcon fixedWidth icon="user" size="lg" className="sidebarIcon" />
                        Profile
                    </NavLink>
                </NavItem>

                <NavItem>
                    
                    <NavLink href="#" className="sidebarItem">
                        <FontAwesomeIcon fixedWidth icon="sign-out-alt" size="lg" className="sidebarIcon" />
                        Logout
                    </NavLink>
                </NavItem>

                <div className="catText">Your submissions</div>

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

export default Menu;