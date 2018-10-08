import React, { Component } from 'react';

class defaultMain extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="main clearfix">
                <p className="paragraphDash">Dashboard</p>
                <div className="box">
                    <p>You have no account linked </p>
                    
                        <button className="btn-full btn-green" onClick={()=>this.props.showLinkAccount(true)}>
                            Link Account
                        </button>
                    
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default defaultMain;