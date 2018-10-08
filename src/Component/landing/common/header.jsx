
import React from 'react';
import logo from './../../../images/logo/logo.png'

// function LandingPage(props){
const Header = (props)=>{
    return(
        //logo open banking portal
        <header>
            <img src={logo} alt="logo" className="logoLanding"/>
        </header>
    );
}

export default Header;