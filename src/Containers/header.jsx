import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Logo from './header/logo';
import Navbar from './header/navbar';
import User from './header/user';
import {logOut} from '../action/'

class Header extends Component {
    render() {
        return (
            <div className="container clearfix">
                <Logo />
                <Navbar />
                <User logOutUser={this.props.logOut} userName={this.props.userName}/>
            </div>
        );
    }
}
function initMapStateToProps(state){
    return {
        userName:state.storedState.userName
    }
}
function initMapDispatchToProps(dispatch){
    return bindActionCreators({
        logOut
    },dispatch);
}
export default connect(initMapStateToProps, initMapDispatchToProps) (Header);