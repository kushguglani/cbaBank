import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeActiveDashboard} from '../../action/';

class Navbar extends Component {
    activeRenderComponent(event){
        console.log("change active state");
        // <Redirect to="event.target.getAttribute('name')" />
        // return <Redirect to='/energy' />;
        this.props.changeActiveDashboard(event.target.getAttribute('name'));
    }
    render() {
        return (
            <React.Fragment>
                <div className="navbarContainer clearfix">
                <ul className="navLinks ">
                    <li>
                        <Link className={"banking" ===this.props.activeDashboard ? "active":""} to="/banking" name="banking" onClick={(event)=>this.activeRenderComponent(event)}>BANKING</Link>
                    </li>
                    <li>
                        <Link className={"energy" ===this.props.activeDashboard ? "active":""} to="/energy" name="energy" onClick={(event)=>this.activeRenderComponent(event)}>ENERGY</Link>
                    </li>
                    <li>
                        <Link className={"dashboard" ===this.props.activeDashboard ? "active":""} to="/dashboard" name="dashboard" onClick={(event)=>this.activeRenderComponent(event)}>TELCO</Link>
                    </li>
                </ul>
                </div>
            </React.Fragment>
        );
    }
}

function initMapStateToProps(state){
    return {
        activeDashboard:state.storedState.activeDashboard
    }
}
function initMapDispatchToProps(dispatch){
    return bindActionCreators({
        changeActiveDashboard
    },dispatch);
}
export default connect(initMapStateToProps, initMapDispatchToProps) (Navbar);