import React from 'react';
import classNames from 'classnames';

import { loginUser } from '../../../service/httpService';
import {
    isEmailValid,
    isPasswordValid
} from '../common/validation';

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordError: "",
            emailError: "",
            disable: true,
            errorMessage: null,
            spinner: false
        }
    }
    // on input change
    inputValueChange = (event) => {
        let value = event.target.value;
        switch (event.target.name) {
            case "email":
                this.setState({
                    [event.target.name]: value,
                    [event.target.name + "Error"]: !isEmailValid(value)
                });
                break;
            case "password":
                this.setState({
                    [event.target.name]: value,
                    [event.target.name + "Error"]: !isPasswordValid(value)
                });
                break;
            default:
                break;
        }
    }
    // check from state any error is true or ""
    isAllFieldValid = () => {
        if (
            this.state.emailError || this.state.emailError === "" ||
            this.state.passwordError || this.state.passwordError === "") {
            return false
        }
        else {
            return true;
        }
    }
    //on enter press 
    checkEnterPress = (event) => {
        if (event.key === 'Enter' || event.charCode === 13 || event.keyCode === 13) {
            // console.log("Enter Pressed");
            this.checkLogin();
        }
    }
    // on login button click
    checkLogin() {
        if (!this.isAllFieldValid()) {
            console.log("error");
        }
        else {
            this.setState({ spinner: true })
            console.log("no error");
            const userDetails = {
                emailId: this.state.email,
                password: this.state.password
            }
            loginUser(userDetails).then(response => {

                // const user = {
                //     emailId: this.state.email,
                //     userName: response.message
                // }

                // isLoadSpinner(false);

                if (response.httpStatus === "400") {
                    // show error invalid credentials
                    console.log(response);
                    this.setState({ errorMessage: response.error });
                    this.setState({ spinner: false })
                }
                else if (response.httpStatus === "200") {
                    const user = {
                        emailId: this.state.email,
                        userName: response.message
                    }
                    // render dashboard
                    this.props.saveLogInValueInStore(user);
                    this.props.isAnyAccountLinked(this.state.email,response.message).then(res=>{
                        console.log(res);
                        if(res)
                            this.props.getTelcoDashboardData(res[0].customerID,res[0].productId,res[0].productName);
                    })
                    this.setState({ spinner: false });
                     
                }
                else {
                    console.log("pradeep server");
                    this.setState({ errorMessage: "Network/Server Error" });
                    this.setState({ spinner: false })
                }
            }, (err) => {
                console.log(err);
                this.setState({ errorMessage: err })
            })
        }
    }
    render() {
        // console.log(this.state);
        let btnClassName = classNames({
            "btn-full": true,
            "btn-green": true,
            "disable": !this.isAllFieldValid(), // call the function directly instead of saving in state
        });
        let userNameField = classNames({
            "userNameField": true,
            "input_error": this.state.emailError
        });
        let passwordField = classNames({
            "passwordField": true,
            "input_error": this.state.passwordError
        });
        let errorClassName = classNames({
            noMessage: !(this.state.errorMessage),
            showErrorMessage: this.state.errorMessage
        });
        let spinnerLoader = classNames({
            loader: this.state.spinner
        })
        return (
            <main>
                <section className="section_signing">
                    <p className="landingHeading">Log in</p>
                    <div className="inputFields">
                        <label className="inputLabel">Email Id</label>
                        <input
                            className={userNameField} value={this.state.email}
                            onChange={this.inputValueChange}
                            type="email"
                            name="email"
                        />
                        <label >Password</label>
                        <input
                            className={passwordField}
                            value={this.state.passwordValue}
                            onChange={this.inputValueChange}
                            type="password"
                            name="password"
                            onKeyPress={this.checkEnterPress}
                        />
                    </div>
                    <label className={errorClassName}>{this.state.errorMessage}<br /></label>
                    <a onClick={() => this.checkLogin()} className={btnClassName} >Log in </a><br />
                    <a className="btn-ghost" >Forgot your password?</a>
                </section>
                <p className="landing-para">New Customer?</p>
                <a className="btn-full btn-blue" onClick={this.props.switchRegister}>Register </a>
                <div className={spinnerLoader}></div>
            </main>

        );
    }
}

export default login;