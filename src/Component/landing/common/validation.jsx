export function checkAllCondition() {
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
export function isUserNameValid(value) {
    return (value.length > 0 && value.length < 3) ? false : true;
}
export function isEmailValid(value) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(String(value).toLowerCase())) ? true : false;
}
export function isPasswordValid(value) {
    return (value.length < 6) ? false : true;

}
export function isConformPasswordValid(value,password) {
    return (value !== password) ? false : true;
}

export const isLoadSpinner=value=>value;

