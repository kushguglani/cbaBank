import React, { Component } from 'react';
import logo from './../../images/logo/logo.png'

class Logo extends Component {
    render() {
        return (
            <div className="leftdiv">
                <img className="dashboardLogo clearfix" src={logo} alt="logo" />
            </div>
        );
    }
}

export default Logo;