import React, { Component } from 'react';

import { Navbar, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class AppNavbar extends Component {
    render() {
        return(
            <Navbar className="mb-5" id="appNavbar">
                <Breadcrumb listClassName="myBreadcrumb" className="d-none d-md-block">
                    <BreadcrumbItem className="myBreadcrumbItem"><a href="#">REVIEW</a></BreadcrumbItem>
                    <BreadcrumbItem className="myBreadcrumbItem" active>ELECTRONICA / DOWNTEMPO</BreadcrumbItem>
                </Breadcrumb>

                <div className="ml-auto">
                <a href="#" className="notificationLink">
                    <FontAwesomeIcon fixedWidth icon="bell" size="lg" />
                </a>

                <a href="#" className="ml-4 d-none d-md-inline">
                    <img src="userpic.png" alt="avatar" className="avatar" />
                    <div className="username d-inline-block ml-2">John Doe</div>
                </a> 
                </div>    
                
                            
            </Navbar>
        );
    }
}

export default AppNavbar;