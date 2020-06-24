import {createStore, applyMiddleware} from 'redux';
import loginReducer from './loginReducer';
import promiseMiddleware from 'redux-promise-middleware';


export default createStore(loginReducer, applyMiddleware(promiseMiddleware));