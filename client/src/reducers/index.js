import { combineReducers } from 'redux';
import songReducer from './songReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    song: songReducer,
    error: errorReducer,
    auth: authReducer
});