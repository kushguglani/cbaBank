import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import Login from './login/login';
import Signup from './signup/signup';
import {
    save_signin_value_in_store,
    save_login_value_in_store,
    fetchTelcoAccount,
    getTelcoDashboardData
} from '../../action/';


class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // enum in javascript
            loginScreen: true,
            signUpScreen: false,
        }
    }
    activeRegister=()=> {
        this.setState({
            loginScreen: false,
            signUpScreen: true,
        })
    }
    activeLogin=()=> {
        this.setState({
            loginScreen: true,
            signUpScreen: false,
        })

    }
    render() {  
        if (this.props.userName && !this.props.isSignInRequired) {
            return <Redirect to='/dashboard' />;
            // after reating route for login page
            // <Link to='/login'>Go to lOgin Page</Link>
        }
        else if (this.state.loginScreen) {
            return <Login
                switchRegister={this.activeRegister}
                saveLogInValueInStore={this.props.save_login_value_in_store}
                isAnyAccountLinked = {this.props.fetchTelcoAccount}
                getTelcoDashboardData = {this.props.getTelcoDashboardData}
            />
        }
        else if (this.state.signUpScreen) {
            return <Signup
                switchLogin={this.activeLogin}
                saveSignInValueInStore={this.props.save_signin_value_in_store}
            />
        }
        return null;
    }
}

function initMapSateToProps(state) {
    return {
        isSignInRequired: state.storedState.signInRequired,
        userName: state.storedState.userName
    }
}
function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        save_signin_value_in_store,
        save_login_value_in_store,
        fetchTelcoAccount,
        getTelcoDashboardData
    }, dispatch);
}

export default connect(initMapSateToProps, initMapDispatchToProps)(main);
// export default main;