import axios from 'axios';
import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return ERRORS
export const returnErrors = (message, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { message, status, id }
    };
};

// Clear ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};