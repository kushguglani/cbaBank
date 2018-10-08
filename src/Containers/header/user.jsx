import React, { Component } from 'react';
// import {connect} from 'react-redux';


class User extends Component {
    
    render() {
        return (
            <div className="userDetail clearfix">
                <p className="textTransform">{this.props.userName}</p>
                <a className="showErrorMessage anchorErrorLogout" onClick={this.props.logOutUser}>LOGOUT </a>
            </div>
        );
    }
}

export default User;