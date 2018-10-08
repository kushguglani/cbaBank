const InitialState = {
    userName: "",
    email: "",
    signInRequired: true,
    accounts: [{ productId: "Link1", productName: "Link Accounts", productDetails: "For Linkingaccount" }],
    manageAccounts: [{ productId: "Manage1", productName: "View Accounts", productDetails: "For View Accounts" }],
    productName: "Link Accounts",
    activeDashboard: "dashboard",
    linkedAccount: false,
    telco: {
        linkedAccount: false,
        accountsFetch: [],
        linkingFail: undefined,
        active: true
    },
    enrgy: {
        linkedAccount: false,
        accountsFetch: [],
        linkingFail: undefined,
        active: false
    },
    banking: {
        linkedAccount: false,
        accountsFetch: [],
        linkingFail: undefined,
        active: false
    },
}

export default function storedState(state = InitialState, action) {
    switch (action.type) {
        case "SAVE_VALUE_IN_LOCAL_STORE":
            return {
                ...state,
                userName: action.payload.userName,
                email: action.payload.emailId,
                signInRequired: false,
                accounts: action.payload.telcoProduct,
                // manageAccounts:[...state.manageAccounts,action.payload.manageAccounts]
                manageAccounts: action.payload.manageAccounts
            }
        case "SAVE_SIGNIN_VALUE_IN_STORE":
            return {
                ...state,
                userName: action.payload.userName,
                email: action.payload.emailId,
                signInRequired: false
            }
        case "SAVE_LOGIN_VALUE_IN_STORE":
            return {
                ...state,
                userName: action.payload.userName,
                email: action.payload.emailId,
            }
        case "LOG_OUT":
            return {
                userName: "",
                email: "",
                signInRequired: true,
                accounts: [{ productId: "Link1", productName: "Link Accounts", productDetails: "For Linkingaccount" }],
                manageAccounts: [{ productId: "Manage1", productName: "View Accounts", productDetails: "For View Accounts" }],
                productName: "Link Accounts",
                activeDashboard: "dashboard",
                telco: {
                    linkedAccount: false,
                    accountsFetch: [],
                    linkingFail: undefined,
                    active: true,
                    dashboard:undefined
                },
                enrgy: {
                    linkedAccount: false,
                    accountsFetch: [],
                    linkingFail: undefined,
                    active: false,
                    dashboard:undefined
                },
                banking: {
                    linkedAccount: false,
                    accountsFetch: [],
                    linkingFail: undefined,
                    active: false,
                    dashboard:undefined
                },
            }
        case "LINK_ACCOUNT":
            console.log(action.payload.value);
            return {
                ...state,
                accountsFetch: [...state.telco.accountsFetch, action.payload],
                linkAccountPage: true,
            }
        case "LINK_ACCOUNT_FAIL":
            console.log(action.payload);
            return {
                ...state,
                linkingFail: action.payload
            }
        case "ADD_FETCH_ACCOUNT":
            console.log(state.telco.accountsFetch);
            return {
                ...state,
                productName: action.payload[0].productName,
                telco: {
                    ...state.telco,
                    accountsFetch: [action.payload]
                },
                manageAccounts: [{ productId: "Manage1", productName: "View Accounts", productDetails: "For View Accounts" }, { productId: "Link1", productName: "Link Accounts", productDetails: "For Linkingaccount" }],

            }
        case "CHANGE_LINK_ACCOUNT":

            return {
                ...state,
                linkAccountPage: action.payload
            }

        case "ACTIVE_LINK_ACCOUNT":
            return {
                ...state,
                productName: "Link Accounts",
                linkedAccount:true
            }
        case "ACTIVE_LINK_ACCOUNT_DASHBOARD":
            return {
                ...state,
                linkedAccount: false,
                productName: action.payload
            }
        case "ADD_TELCO_DASHBOARD":
            return {
                ...state,
                telco:{ ...state.telco,
                    dashboard:action.payload},
                linkedAccount: false,
                signInRequired: false,
            }
        case "ADD_TELCO_PRODUCT_NAME":
            return {
                ...state,
                productName: action.payload,
                // telco:{...state.telco,
                //     productName:action.payload},
            }
        case "LINK_ACCOUNT_REQUEST":
            return state;
        case "ADD_PRODUCT_IN_STORE":
            return {
                ...state,
                linkAccountPage: false,
                productName: action.payload[0].productName || "",
                telco:{ ...state.telco,
                    dashboard:action.payload},

            }
        case "CHANGE_ACTIVE_DASHBOARD":
            console.log(state);
            return {
                ...state,
                activeDashboard: action.payload
            }
        default:
            return state;
    }
}