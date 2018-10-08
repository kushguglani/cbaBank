import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTelcoDashboardData, changeLinkAccount } from '../action/'
import accountImg from '../images/icons/accountImg.png';
import manageAccountImg from '../images/icons/manageAccountImg.png';
import Accounts from './main/menuBar/account';


class LeftMenuBar extends Component {
    leftBarClick = (cid, pid, productName, active) => {
        console.log("click");
        console.log(cid, pid);
        if (cid === "Link1") {
            this.props.changeLinkAccount(true);
        }
        else if (cid === "Manage1") {
            console.log("Viw Account page");
        }
        else {
            this.props.getTelcoDashboardData(cid, pid, productName)
        }
    }
    render() {
        if (this.props.activeDashboard === "dashboard") {
            let accounts;
            if (this.props.telco.accountsFetch[0]) {
                console.log(this.props.telco.accountsFetch[0]);
                accounts = this.props.telco.accountsFetch[0].map(curr =>
                    <p className={curr.productName === this.props.productName ? "active_product" : ""} key={curr.productId}
                        onClick={() => this.leftBarClick(curr.customerID, curr.productId, curr.productName, "telco")}>{curr.productName}
                    </p>
                )
            }
            else {
                accounts = <Accounts activeProduct={this.props.productName} data={this.props.accounts} leftBarClick={this.leftBarClick} />
            }
            console.log(accounts);
            return (
                <div className="sidenav">
                    <label><img alt="Account Icon" src={accountImg} />DASHBOARD</label>
                    <div className="LeftManuBarData">
                        {accounts}
                    </div>
                    <label> <img alt="Manage Account Icon" src={manageAccountImg} />MANAGE ACCOUNTS</label>
                    <Accounts activeProduct={this.props.productName} data={this.props.manageAccounts} leftBarClick={this.leftBarClick} />

                </div>
            );
        } else if (this.props.activeDashboard==="banking") {

            let accounts;
            if (this.props.bankingAccountsFetch) {
                accounts = this.props.fetchAccounts.map(curr => <p className={curr.productName === this.props.productName ? "active_product" : ""} key={curr.productId} onClick={() => this.leftBarClick(curr.customerID, curr.productId, curr.productName)}>{curr.productName}
                </p>
                )
            }
            else {
                accounts = <Accounts activeProduct={this.props.productName} data={this.props.accounts} leftBarClick={this.leftBarClick} />
            }
            return (
                <div className="sidenav">
                    <label><img alt="Account Icon" src={accountImg} />DASHBOARD</label>
                    <div className="LeftManuBarData">
                        {accounts}
                    </div>
                    <label> <img alt="Manage Account Icon" src={manageAccountImg} />MANAGE ACCOUNTS</label>
                    <Accounts activeProduct={this.props.productName} data={this.props.manageAccounts} leftBarClick={this.leftBarClick} />

                </div>
            );

        } else {
            console.log("srtytudiyiu");
            return (
                <p>fddadfadas</p>
            )
        }
    }
}
function initMapStateToProps(state) {
    console.log(state.storedState);
    return {
        banking: state.storedState.banking,
        telco: state.storedState.telco,
        manageAccounts: state.storedState.manageAccounts,
        productName:state.storedState.productName,
        accounts:state.storedState.accounts,
        activeDashboard:state.storedState.activeDashboard
    }
}
function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTelcoDashboardData,
        changeLinkAccount
    }, dispatch)
}

// export default LeftMenuBar;
export default connect(initMapStateToProps, initMapDispatchToProps)(LeftMenuBar);