import { combineReducers } from 'redux';
import songReducer from './songReducer';

export default combineReducers({
    song: songReducer
});