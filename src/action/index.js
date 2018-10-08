
import {
    linkTelcoAccountService,
    linkBankAccountService,
    fetchTelcoAccountsService,
    getTelcoDashboardService
} from '../service/httpService'

export function save_signin_value_in_store(value) {
    return {
        type: "SAVE_SIGNIN_VALUE_IN_STORE",
        payload: value
    }
}
export function save_login_value_in_store(value) {
    return {
        type: "SAVE_LOGIN_VALUE_IN_STORE",
        payload: value
    }
}

export function logOut() {
    console.log("logout");
    localStorage.clear();
    return {
        type: "LOG_OUT"
    }
}

// add telco account by cutomer id 
export function addLinkAccount(custId, email) {
    function start() {
        return {
            type: "LINK_ACCOUNT_REQUEST",
        }
    }

    return function (dispatch) {
        dispatch(start());
        return linkTelcoAccountService(custId, email);
    }
}

// add bank account by cutomer id 
export function linkBankAccount(bankId,accountId, email) {
    function start() {
        return {
            type: "LINK_ACCOUNT_REQUEST",
        }
    }

    return function (dispatch) {
        dispatch(start());
        return linkBankAccountService(bankId, accountId, email);
    }
}

export function fetchTelcoAccount(emailId, userName) {
    function success(value) {
        return {
            type: "ADD_FETCH_ACCOUNT",
            payload: value
        }
    }
    function noAccountLinked(value) {
        return {
            type: "SAVE_SIGNIN_VALUE_IN_STORE",
            payload: value
        }
    }
    return function (dispatch) {
        const value = {
            emailId,
            userName
        }
        // dispatch(noAccountLinked(value));
        return fetchTelcoAccountsService(emailId).then(res => {
            console.log(res);
           
            if (res.data.error) {

                dispatch(noAccountLinked(value));
            }
            else {
                // fetch products // show on left bar //show 3 graphs4
                console.log(res.data);
                dispatch(success(res.data));
                return res.data;
                // getTelcoDashboardData(res.data[0].customerID,res.data[0].productId,res.data[0].productName)
                // getTelcoDashboard(res.data[0].customerID,res.data[0].productId).then(res=>{
                //     dispatch(successDash(res.data))
                //     console.log(res.data)
                // });
            }
        })
    }
}

export function getTelcoDashboardData(cid, pid,pName) {
    console.log(pid,cid,pName)
    function start() {
        return{
            type:"ADD_TELCO_PRODUCT_NAME",
            payload:pName
        }
    }
    function success(value) {
        return{
            type:"ADD_TELCO_DASHBOARD",
            payload:value
        }
    }
    return function (dispatch) {
        dispatch(start())
        return getTelcoDashboardService(cid, pid).then(res=>{
            dispatch(success(res.data))
            console.log(res.data)
        });
    }
}

export function changeLinkAccount(value){
    console.log(value);
    return{
        type:"ACTIVE_LINK_ACCOUNT",
        payload:value
    }
}
export function changeLinkAccountDashboard(value){
    console.log(value);
    return{
        type:"ACTIVE_LINK_ACCOUNT_DASHBOARD",
        payload:value
    }
}

export function changeActiveDashboard(value){
    console.log(value);
    return{
        type:"CHANGE_ACTIVE_DASHBOARD",
        payload:value
    }
}