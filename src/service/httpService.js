import axios from 'axios';
import { SIGNUP_API_URL, Login_API_URL,ROOT_API_URL } from '../lib/constant';

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
export function linkAccount(custId,email){
    const link_telco_url = `${ROOT_API_URL}/${email}/${custId}/telcoLinkAccount`;
    return axios({method:"POST",url:link_telco_url.trim(),headers:{'Content-Type': 'application/json; charset=utf-8'}})
    
}
export function fetchTelcoAccounts(email){
    const fetch_telco_Account = `${ROOT_API_URL}/${email}/getTelcoViewAccounts`;
    return axios({method:"GET",url:fetch_telco_Account.trim(),headers:{'Content-Type': 'application/json; charset=utf-8'}})
}
export function getTelcoDashboard(cid,pid){
    const fetch_telco_Account = `${ROOT_API_URL}/${cid}/${pid}/getTelcoDashboard`;
    return axios({method:"GET",url:fetch_telco_Account.trim(),headers:{'Content-Type': 'application/json; charset=utf-8'}})
}