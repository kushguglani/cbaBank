import React from 'react';
import Footer from '../Component/landing/common/footer';
// import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Header from './header.jsx';
import LeftMenuBar from './leftMenuBar';
// import Routing from './routing';
import Main from './main/main'

export default class Energy extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="mainbody clearfix">
                <LeftMenuBar />
                {/* <hr className="lineHr" /> */}
                <Main />
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}