import React, { Component } from 'react';

import { Navbar, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class AppNavbar extends Component {
    render() {
        return(
            <Navbar className="mb-5" id="appNavbar">
                <Breadcrumb listClassName="myBreadcrumb">
                    <BreadcrumbItem className="myBreadcrumbItem"><a href="#">REVIEW</a></BreadcrumbItem>
                    <BreadcrumbItem className="myBreadcrumbItem" active>ELECTRONICA / DOWNTEMPO</BreadcrumbItem>
                </Breadcrumb>
                {/* 
                <FontAwesomeIcon fixedWidth icon="bell" size="lg" className="notificationsButton" />
                <a href="#">
                    <img src="logo.png" alt="avatar" className="avatar" />
                    <div className="username">John Doe</div>
                </a> 
                */} 
            </Navbar>
        );
    }
}

export default AppNavbar;