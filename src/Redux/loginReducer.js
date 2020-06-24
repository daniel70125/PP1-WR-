import axios from 'axios';

const initialState = {
    email: "",
    password: "",
    isLoggedIn: false,
    user: {},
    isLoading: false,
    jobs: [],
    weather: []
}

const LOGIN = 'LOGIN';
const GET_USER = 'GET_USER';
const LOGOUT = 'LOGOUT';
const GET_JOBS = 'GET_JOBS';
const GET_WEATHER = 'GET_WEATHER';
export function getWeather(){
    const weather = axios.get('http://api.openweathermap.org/data/2.5/weather?q=New+Orleans,usa&units=imperial&APPID=361b17e462c23405876fe5009cefde8b');

    return {
        type: GET_WEATHER,
        payload: weather
    }
}
export function loginUser(user){
    return {
        type: LOGIN,
        payload: user
    }
}
export function getJobs(id){
     const jobs = axios.post(`/admin/getJobs`, {id}) ;

    return {
        type: GET_JOBS,
        payload: jobs
    }
    
}
export function getUser(){
    const user = axios.get('/session');

    return {
        type: GET_USER,
        payload: user
    }
}
export function logout(){
return {
    type: LOGOUT,
    payload: initialState
}
}

export default function loginReducer(state = initialState, action){
const {type, payload} = action;
switch(type){
    case LOGIN:
        return {...state, user: payload.data, isLoggedIn: true}
    case GET_JOBS + '_PENDING':
        return {...state, isLoading: true}
    case GET_JOBS + '_FULFILLED':
        return {...state, jobs: payload.data, isLoading: false}
    case GET_JOBS + '_REJECTED':
        return initialState
    case GET_USER + '_PENDING':
        return {...state}
    case GET_USER + '_FULFILLED':
        return {...state, user:payload.data, isLoggedIn: true}
    case GET_USER + '_REJECTED':
        return initialState
        case GET_WEATHER + '_PENDING':
        return {...state, isLoading: true}
    case GET_WEATHER + '_FULFILLED':
        return {...state, weather: payload.data, isLoading: false}
    case GET_WEATHER + '_REJECTED':
        return initialState
    case LOGOUT:
        return initialState;
    default:
        return state
    }
}