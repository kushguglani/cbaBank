import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { composeWithDevTools } from 'redux-devtools-extension';


import rootReducer from '../reducers/reducer';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    composeWithDevTools(
    process.env.NODE_ENV ==='development'
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk)
    )
);

export const persistor = persistStore(store)

export default store;