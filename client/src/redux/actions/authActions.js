import axios from 'axios';
import { returnErrors } from './errorActions';
import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
 } from './types';

 // Check token & get user
 export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', headersConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        });
 }

 // Register User
 export const register = newUser => dispatch => {

     axios.post('/api/users', newUser)
        .then(res => {
            if(res.data.status) 
                dispatch(returnErrors(res.data.message, res.data.status, 'REGISTER_FAIL'))
            else
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
        })
        .catch(err => {
            dispatch({ type: REGISTER_FAIL })
        });
 }

// Login
export const login = user => dispatch => {

    axios.post('/api/auth', user)
        .then(res => {
            if(res.data.status) 
                dispatch(returnErrors(res.data.message, res.data.status, 'LOGIN_FAIL'))
            else
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
        })
        .catch(err => {
            // dispatch({ type: LOGIN_FAIL })
        });
}

 // Logout
 export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
 }

 // Setup config/headers and token
 export const headersConfig = (getState) => {
    // Get token from localStorage
    const token = getState().authReducer.token;
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // If token, add to header
    if(token) config.headers['x-auth-token'] = token;

    return config;
 };