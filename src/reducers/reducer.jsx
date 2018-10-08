import {combineReducers} from 'redux';

import storedState from './storedState';

const reducer = combineReducers({
    storedState:storedState
})

export default reducer;