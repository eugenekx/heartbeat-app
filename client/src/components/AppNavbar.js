import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';


class AppNavbar extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const userPanel = (
            <Fragment>
                <a href="#" className="ml-4 d-none d-md-inline">
                        <img src="userpic.png" alt="avatar" className="avatar" />
                        <div className="username d-inline-block ml-2">
                            { user ? user.name : null }
                        </div>
                </a> 
            </Fragment>
        )

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

                    
                </div>    
                
                { isAuthenticated ? userPanel : null}
                            
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);