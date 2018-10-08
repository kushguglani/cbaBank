
import React from 'react';
import Header from './common/header';
import Body from './main';
import Footer from './common/footer';
import './css/landing_css.css';

// function LandingPage(props){
const LandingPage = (props) => {
    return (
        <div className="App">
            <Header />
            <Body title="login" />
            <Footer />
        </div>
    );
}

export default LandingPage;