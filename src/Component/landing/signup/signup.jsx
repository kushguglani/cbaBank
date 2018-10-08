
import React from 'react';
import classNames from 'classnames';

import { signupUser } from '../../../service/httpService';
import {
    isUserNameValid,
    isEmailValid,
    isPasswordValid,
    isConformPasswordValid,
} from '../common/validation';

class signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            email: "",
            password: "",
            conformPassword: "",
            userNameError: "",
            emailError: "",
            passwordError: "",
            conformPasswordError: "",
            disable: true,
            errorMessage: null,
            spinner:false
        }
    }
    // check from state any error is true or ""
    isAllFieldValid = () => {
        if (this.state.conformPasswordError || this.state.conformPasswordError === "" ||
            this.state.userNameError || this.state.userNameError === "" ||
            this.state.emailError || this.state.emailError === "" ||
            this.state.passwordError || this.state.passwordError === "") {
            return false
        }
        else {
            return true;
        }
    }
    // on input change
    inputValueChange = (event) => {

        const value = event.target.value;

        this.setState({
            [event.target.name]: event.target.value
        });
        switch (event.target.name) {
            case "userName":
                this.setState({
                    [event.target.name + 'Error']: !isUserNameValid(value)
                })
                break;
            case "email":
                this.setState({
                    [event.target.name + 'Error']: !isEmailValid(value)
                })

                break;
            case "password":
                this.setState({
                    [event.target.name + 'Error']: !isPasswordValid(value)
                })

                break;
            case "conformPassword":
                this.setState({
                    [event.target.name + 'Error']: !isConformPasswordValid(value, this.state.password)
                })

                break;

            default:
                break;
        }
    }
    // on submit
    onRegisterClick() {
        if (!this.isAllFieldValid()) {
            console.log("error");
        }
        else {
            this.setState({ spinner: true })
            console.log("no error");
            //call action then action call service
            const userDetails = {
                userName: this.state.userName,
                emailId: this.state.email,
                password: this.state.password
            }
            signupUser(userDetails).then(response => {
                // render dashboard
                this.setState({ spinner: false })

                console.log("My Response: " + response);

                if (response.httpStatus === "400") {
                    // show error
                    this.setState({ errorMessage: response.error })
                }
                else if (response.httpStatus === "201") {
                    const user = {
                        emailId: this.state.email,
                        userName: response.message
                    }
                    // render dashboard
                    // store value in local storage
                    this.props.saveSignInValueInStore(user);
                }
                else {
                    console.log("pradeep server");
                    this.setState({ errorMessage: "Network/Server Error" })
                }
            }, (err) => {
                console.log(err);
                this.setState({ errorMessage: err })
            })
        }
    }
    //on enter press 
    checkEnterPress = (event) => {
        if (event.key === 'Enter' || event.charCode === 13 || event.keyCode === 13) {
            // console.log("Enter Pressed");
            this.onRegisterClick();
        }
    }
    render() {
        const { userName } = this.state;
        // css classes
        let btnClassName = classNames({
            "btn-full": true,
            "btn-blue": true,
            "disable": !this.isAllFieldValid(), // call the function directly instead of saving in state
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
                    {/* box heading input fields button othher buttons */}
                    <p className="landingHeading">Register</p>
                    <div className="inputFields">
                        <label>Full Name</label>
                        <input
                            name='userName'
                            className={this.state.userNameError === true ? 'input_error' : ''}
                            type="text"
                            value={userName}
                            onChange={this.inputValueChange}
                        /><br />
                        <label>E-mail Address</label>
                        <input
                            name='email'
                            className={this.state.emailError === true ? 'input_error' : ''}
                            type="email"
                            onChange={this.inputValueChange}
                            value={this.state.email}
                        /><br />
                        <label>Password</label>
                        <input
                            name='password'
                            className={this.state.passwordError === true ? 'input_error' : ''}
                            type="password"
                            value={this.state.password}
                            onChange={this.inputValueChange}
                        /><br />
                        <label>Confirm Password</label>
                        <input
                            name='conformPassword'
                            className={this.state.conformPasswordError === true ? 'input_error' : ''} type="password"
                            value={this.state.conformPassword}
                            onChange={this.inputValueChange}
                            onKeyPress={this.checkEnterPress}
                        /><br />
                        <label className={errorClassName}>{this.state.errorMessage}</label>
                    </div>
                    <a onClick={() => this.onRegisterClick()} className={btnClassName}  >Register    </a>
                </section>
                <p className="landing-para">Already a member?</p>
                <a className="btn-full btn-green" onClick={this.props.switchLogin}>Login </a>
                <div className={spinnerLoader}></div>
            </main>
        );
    }
}
export default signup;