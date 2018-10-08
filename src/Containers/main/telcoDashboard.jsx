import React, { Component } from 'react';
import {connect} from 'react-redux';


import AmountDetails from './telco/amountDetails';
import DataUsageDetails from './telco/dataUsageDetails';

class TelcoDashboard extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="main clearfix">
                <p className="paragraphDash">{this.props.productName}</p>
                <AmountDetails />
                <DataUsageDetails />
            </div>
            </React.Fragment>
        );
    }
}
function initMapStateToProps(state){
    return{
        productName:state.storedState.productName
    }
}
export default connect(initMapStateToProps) (TelcoDashboard);