import React, { Component } from 'react';
import { connect } from 'react-redux';

class AmountDetails extends Component {
    render() {
        return (
            <div className="telcoBox">
                <div>
                    <p className="ammount_content"> Amount Due : {this.props.ammountDue} </p>

                    <button className="btn-full btn-green">Pay Now</button>
                    <button className="btn-full btn-blue">View Bill</button>
                    <span className="verLine"></span>
                    <p className="best_plan">View Best Plans for Me</p>
                </div>

                <p className="dueOn"> Due on: {this.props.usageEndDate} </p>

            </div>
        );
    }
}

function initMapStateToProps(state) {
    return {
        productName: state.storedState.productName,
        ammountDue: state.storedState.telco.dashboard.usageServices[0].usageProducts[0].usage.billedAmount,
        usageEndDate: state.storedState.telco.dashboard.usageServices[0].usageProducts[0].usage.usageEndDate

    }
}
export default connect(initMapStateToProps)(AmountDetails);