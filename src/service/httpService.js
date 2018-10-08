import axios from 'axios';
import { 
    SIGNUP_API_URL,
    Login_API_URL,
    ROOT_API_URL,
    TELCO_LINK_ACCOUNT_URL,
    BANK_LINK_ACCOUNT_URL,
    GET_TELCO_ACCOUNT_URL,
    GET_TELCO_ACCOUNT_DASHBOARD_URL } from '../lib/constant';

export function loginUser(data) {
    return axios({method:"POST",url:Login_API_URL.trim(),data:data,headers:{'Content-Type': 'application/json; charset=utf-8'}})
        .then(response => {
            return response.data
        })
        .catch(error => error);
}
export function signupUser(data){
        return axios({method:"POST",url:SIGNUP_API_URL.trim(),data:data,headers:{'Content-Type': 'application/json; charset=utf-8'}})
        .then(response=> {
            return response.data;
        })
        .catch(error=> error);
    
}
export function linkTelcoAccountService(custId,email){
    const link_telco_url = `${ROOT_API_URL}/${email}/${custId}/${TELCO_LINK_ACCOUNT_URL}`;
    return axios({method:"POST",url:link_telco_url.trim(),headers:{'Content-Type': 'application/json; charset=utf-8'}})
    
}

export function linkBankAccountService(bankId,accountId,email){
    const link_telco_url = `${ROOT_API_URL}/${email}/${bankId}/${accountId}/${BANK_LINK_ACCOUNT_URL}`;
    return axios({method:"POST",url:link_telco_url.trim(),headers:{'Content-Type': 'application/json; charset=utf-8'}})
    
}
export function fetchTelcoAccountsService(email){
    const fetch_telco_Account = `${ROOT_API_URL}/${email}/${GET_TELCO_ACCOUNT_URL}`;
    return axios({method:"GET",url:fetch_telco_Account.trim(),headers:{'Content-Type': 'application/json; charset=utf-8'}})
}
export function getTelcoDashboardService(cid,pid){
    const fetch_telco_Account = `${ROOT_API_URL}/${cid}/${pid}/${GET_TELCO_ACCOUNT_DASHBOARD_URL}`;
    return axios({method:"GET",url:fetch_telco_Account.trim(),headers:{'Content-Type': 'application/json; charset=utf-8'}})
}