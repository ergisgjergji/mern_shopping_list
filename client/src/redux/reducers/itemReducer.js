import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    isLoading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                isLoading: false
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item => (item._id === action.payload._id ? action.payload : item))
            }
        case ITEMS_LOADING: 
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
}