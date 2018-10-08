import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import {
    addLinkAccount,
    fetchTelcoAccount,
    getTelcoDashboardData
} from '../../action/';

class linkAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: "",
            linkError: undefined
        }
    }
    customerIdChange = (event) => {
        this.setState({
            customerId: event.target.value
        })

    }
    addTelcoLinkAccount = () => {
        console.log("qwerty");
        this.setState({ spinner: true });
        this.props.addLinkAccount(this.state.customerId, this.props.email).then(res => {
            console.log(res);
            if (res.data.error) {
                this.setState({ spinner: false, linkError: res.data.error });
                console.log(res);
            }
            else {
                this.setState({ spinner: false, linkError: "" });
                // this.props.fetchTelcoAccount(this.props.email,)
                this.props.fetchTelcoAccount(this.props.email, this.props.userName).then(res => {
                    let fetchAccounts = this.props.telco.accountsFetch[0];
                    console.log(fetchAccounts);
                    console.log(fetchAccounts[0]);
                    this.props.getTelcoDashboardData(fetchAccounts[0].customerID, fetchAccounts[0].productId, fetchAccounts[0].productName);

                })
            }
        })
            .catch(err => {
                console.log(err);
                this.setState({ spinner: false, linkError: "Network Error/ Try Again" });
            })
    }
    render() {

        let spinnerLoader = classNames({
            loader: this.state.spinner
        });

        let errorClassName = classNames({
            noMessage: !(this.state.linkError),
            showErrorMessage: this.state.linkError
        });
        let productName;
        let storeList = this.props.telco.accountsFetch[0];
        if (storeList) {
            productName = storeList[0].productName
        }
        else {
            console.log(this.props.productName);
            productName = this.props.productName
        }   
        let linkAccountFields;
        if (this.props.activeDashboard === "dashboard") {
            linkAccountFields =
                <div className="inputFields">
                    <input
                        name='customerId'
                        type="text"
                        placeholder="Customer ID"
                        value={this.state.customerId}
                        onChange={this.customerIdChange}
                    /> <br />
                    <label className={errorClassName}>{this.state.linkError}</label>
                    <button className="btn-full btn-green" onClick={this.addTelcoLinkAccount}> Submit </button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn-full btn-blue" onClick={() => this.props.showDashboard(productName)}>
                        Cancel
                    </button>
                    <div className={spinnerLoader}></div>
                </div>
        }

        else if (this.props.activeDashboard === "banking") {
            linkAccountFields =
            <div className="inputFields">
                <input
                    name='customerId'
                    type="text"
                    placeholder="Account ID"
                    value={this.state.customerId}
                    onChange={this.customerIdChange}
                /> <br />
                 <input
                    name='customerId'
                    type="text"
                    placeholder="Bank ID"
                    value={this.state.customerId}
                    onChange={this.customerIdChange}
                /> <br />
                <label className={errorClassName}>{this.state.linkError}</label>
                <button className="btn-full btn-green" onClick={this.addTelcoLinkAccount}> Submit </button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn-full btn-blue" onClick={() => this.props.showDashboard(productName)}>
                    Cancel
                </button>
                <div className={spinnerLoader}></div>
            </div>
        }
        else{
            linkAccountFields =
            <div className="inputFields">
                <input
                    name='customerId'
                    type="text"
                    placeholder="Customer ID"
                    value={this.state.customerId}
                    onChange={this.customerIdChange}
                /> <br />
                <label className={errorClassName}>{this.state.linkError}</label>
                <button className="btn-full btn-green" onClick={this.addTelcoLinkAccount}> Submit </button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn-full btn-blue" onClick={() => this.props.showDashboard(productName)}>
                    Cancel
                </button>
                <div className={spinnerLoader}></div>
            </div>
        }
        return (

            <React.Fragment>
                <div className="main clearfix">
                    <p className="paragraphDash">Link Account</p>
                    <div className="box">

                        {linkAccountFields}

                    </div>
                </div>
            </React.Fragment>
        );
    }
}
function initMapStateToProps(state) {
    console.log(state);
    return {
        email: state.storedState.email,
        userName: state.storedState.userName,
        productName: state.storedState.productName,
        activeDashboard: state.storedState.activeDashboard,
        telco:state.storedState.telco
    }
}
function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        addLinkAccount,
        fetchTelcoAccount,
        getTelcoDashboardData,
    }, dispatch)
}

export default connect(initMapStateToProps, initMapDispatchToProps)(linkAccount);