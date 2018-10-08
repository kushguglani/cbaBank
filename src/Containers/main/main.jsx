import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LinkAccount from './linkAccount';
import TelcoDashboard from './telcoDashboard';
import DefaultMain from './defaultMain';
import { changeLinkAccount, getTelcoDashboardData, changeLinkAccountDashboard } from '../../action/';

class main extends Component {

  activeLinkAccount = (status) => {
    this.setState({
      linkAccountPage: status
    })
  }
  render() {
    console.log(this.props.telco);

    if (this.props.activeDashboard ==="dashboard") {
      if (this.props.linkedAccount) {
        return <LinkAccount showDashboard={this.props.changeLinkAccountDashboard} />
      }
      else if (this.props.telco.accountsFetch[0]) {
        return <TelcoDashboard showDefault={this.props.changeLinkAccount} />
      } else {
        console.log("here");
        return <DefaultMain showLinkAccount={this.props.changeLinkAccount} account="linkAccountPage" />
      }
    }


    else if (this.props.activeDashboard === "banking") {
      if (this.props.linkedAccount) {
        return <LinkAccount showDashboard={this.props.changeLinkAccountDashboard} />
      }
      else if (this.props.bankingAccountsFetch) {
        return <TelcoDashboard showDefault={this.props.changeLinkAccount} />
      } else {
        return <DefaultMain showLinkAccount={this.props.changeLinkAccount} account="linkBankAccountPage" />
      }
    }
    else {
      // if (this.props.linkAccountPage) {
      //   return <LinkAccount showDashboard={this.props.changeLinkAccountDashboard} />
      // }
      // else if (this.props.accountsFetch[0]) {
      //   return <TelcoDashboard showDefault={this.props.changeLinkAccount} />
      // } else {
      //   return <DefaultMain showLinkAccount={this.props.changeLinkAccount} account="linkEnergyAccountPage" />
      // }
      return <p>/p></p>
    }
  }
}


function initMapSateToProps(state) {
  console.log(state);
  return {
    account: state.storedState.accounts,
    telco: state.storedState.telco,
    banking: state.storedState.banking,
    linkedAccount: state.storedState.linkedAccount,
    activeDashboard:state.storedState.activeDashboard

  }
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLinkAccount,
    getTelcoDashboardData,
    changeLinkAccountDashboard
  }, dispatch)
}

export default connect(initMapSateToProps, initMapDispatchToProps)(main);