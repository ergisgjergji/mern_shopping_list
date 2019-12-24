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