import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';


export class Landing extends Component {    
    render() {
        return (
            <Fragment>
                <div className="logo-landing">
                    <img className="logo-landing-img" src="/logo.png" alt="logo"></img>
                </div>

                <div className="landing-links-bar">
                    <Link to="/login" className="landing-link">LOG IN</Link>
                    <Link to="/register" className="landing-link">SIGN UP</Link>
                </div>
                    
                <div className="landing-main"  ref={e => (this.el = e)}>
                    <div className="animation" />
                    <p className="heading-1 landing-gradient-text">MAKE HEARTS <span className="">BEAT</span></p>
                    <p className="heading-2">Get your music reviewed by HeartBeat community</p>
                    <Link to="/login" className="landing-button">GET STARTED!</Link>
                </div>
            </Fragment>
        )
    }
}

export default Landing
